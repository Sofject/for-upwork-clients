// @ts-nocheck

import { FullPageBreadcrumb } from "@/components/common/misc/breadcrumb";
import { FeaturedPostSection } from "@/components/pages/blog/featured-post-section";
import { BlogFilterSection, PAGE_SIZE } from "@/components/pages/blog/blog-filter-section";
import { navigation } from "@/content/common/navigation";
import { getPosts } from "@/lib/api";
import { generateOGMetadata } from "@/lib/utils";
import { generateBlogPostingJsonLd } from "@/lib/json-ld";

export const dynamic = "force-static"
export const dynamicParams = true

export const metadata = generateOGMetadata({
  title: "Blog",
  description: "All the news, stories and insights you need to know about business communication.",
  openGraph: { url: navigation.blogs },
});

export default async function BlogsPage() {
  const currentPage = 1;

  const { posts, total } = await getPosts("blogPost", 0, PAGE_SIZE);

  const featuredPosts = Array.isArray(posts) ? posts.slice(0, 3) : [];
  const restPosts = Array.isArray(posts) ? posts.slice(3) : [];

  const jsonLd = generateBlogPostingJsonLd(posts, "BlogPosting", navigation.blogs, navigation.blogs, "Blog");

  return (
    <main>
      <FullPageBreadcrumb
        segments={[
          { label: "Home", href: navigation.home },
          { label: "Blog", href: navigation.blogs },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {featuredPosts.length && <FeaturedPostSection posts={featuredPosts} route={navigation.blogs} />}

      <BlogFilterSection posts={restPosts} currentPage={currentPage} total={total} paginationBasePath={navigation.blogs} />
    </main>
  );
}
