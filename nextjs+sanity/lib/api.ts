// @ts-nocheck

import { sanityFetch } from "@/sanity/lib/fetch"
import {
  paginatedPostsByTagQuery,
  paginatedPostsQuery,
  postQuery,
  postsCountByTagQuery,
  postsCountQuery,
} from "@/sanity/lib/queries"

export async function getPostBySlug(type: string, slug: string) {
  const post = await sanityFetch({
    query: postQuery,
    params: { type, slug },
    tags: [`post:${type}:${slug}`],
  })

  return post;
}

export async function getPosts(type: string, offset: number, end: number) {
  const [posts, total] = await Promise.all([
    sanityFetch({
      query: paginatedPostsQuery,
      params: { type, offset, end },
      tags: [`posts:${type}:listing`],
    }),
    sanityFetch({
      query: postsCountQuery,
      params: { type },
      tags: [`posts:${type}:count`],
    }),
  ]);

  return { posts, total }
}

export async function getPostsByTag(type: string, tag: string, offset: number, end: number) {
  const [posts, total] = await Promise.all([
    sanityFetch({
      query: paginatedPostsByTagQuery,
      params: { type, postTag: tag, offset, end },
      tags: [`posts:${type}:tag:${tag}`],
    }),
    sanityFetch({
      query: postsCountByTagQuery,
      params: { type, postTag: tag },
      tags: [`posts:${type}:tag:${tag}:count`],
    }),
  ]);

  return { posts, total }
}
