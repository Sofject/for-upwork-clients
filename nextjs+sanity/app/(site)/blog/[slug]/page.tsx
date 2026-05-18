// @ts-nocheck

import { notFound } from "next/navigation";
import { FullPageBreadcrumb } from "@/components/common/misc/breadcrumb";
import { BlogArticle } from "@/components/pages/blog/blog-article";
import { navigation } from "@/content/common/navigation";
import { getPostBySlug } from "@/lib/api";
import { generateOGMetadata } from "@/lib/utils";
import { generateArticleJsonLd } from "@/lib/json-ld";

export const dynamic = "force-static"
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug("blogPost", slug);

  if (!post?._id) {
    return notFound();
  }

  return generateOGMetadata({
    title: post.title,
    description: post.excerpt,
    openGraph: { url: `${navigation.blogs}/${slug}`, type: "article" },
    other: {
      authors: [{ name: post?.author?.name ?? "Blog Team" }],
      keywords: post.tags?.map(tag => tag.value ?? "") ?? [],
    },
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug("blogPost", slug);

  if (!post?._id) {
    return notFound();
  }

  const jsonLd = generateArticleJsonLd(post, "BlogPosting", navigation.blogs);

  return (
    <>
      <FullPageBreadcrumb
        segments={[
          { label: "Home", href: navigation.home },
          { label: "Blog", href: navigation.blogs },
          { label: post.title, href: `${navigation.blogs}/${slug}` },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BlogArticle post={post} route={navigation.blogs} />
    </>
  );
}
