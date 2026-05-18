// @ts-nocheck

import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

/**
 * This is a Next.js API route that revalidates the blog page and the blog post page when a blog post is created, updated, or deleted from Sanity studio.
 * It is used to ensure that the blog page and the blog post page are always up to date.
 */

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Missing environment variable SANITY_REVALIDATE_SECRET" }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, process.env.SANITY_REVALIDATE_SECRET, true)

    if (!isValidSignature) {
      const message = "Invalid signature"
      return NextResponse.json({ revalidated: false, message, isValidSignature, body }, { status: 401 })
    }

    if (!body) {
      return NextResponse.json({ revalidated: false, message: "Nothing to revalidate" }, { status: 400 })
    }

    const { slug, type, tags, prevTags } = body;

    if (type === "blogPost" || type === "newsEvents") {
      revalidateTag("post:blogPost:latest");
    }

    if (type) {
      revalidateTag(`posts:${type}:listing`);
      revalidateTag(`posts:${type}:count`);
      revalidateTag(`posts:${type}:latest`);
    }

    if (slug) {
      revalidateTag(`post:${type}:${slug}`);
    }

    if (tags) {
      const allTags = new Set([...tags, ...(prevTags || [])]);
      for (const tag of allTags) {
        revalidateTag(`posts:${type}:tag:${tag}`);
        revalidateTag(`posts:${type}:tag:${tag}:count`);
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), body });
  } catch (err: any) {
    return NextResponse.json({ revalidated: false, message: err.message }, { status: 500 })
  }
}

type WebhookPayload = {
  slug: string | null;
  type: string | null;
  tags: string[] | null;
  prevTags: string[] | null;
}
