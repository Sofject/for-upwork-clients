// @ts-nocheck

import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  coverImage,
  "date": coalesce(publishDate, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
  "tags": tags[]->{_id, label, "value": value.current},
`;

export const postQuery = defineQuery(`
  *[_type == $type && slug.current == $slug] [0] {
    "content": body,
    "plainContent": pt::text(body),
    ${postFields}
    "related": *[
      _type == $type
      && _id != ^._id
      && defined(slug.current)
      && references(^.tags[]._ref)
    ] | order(publishDate desc, _updatedAt desc) [0...3] {
      ${postFields}
    }
  }
`);

