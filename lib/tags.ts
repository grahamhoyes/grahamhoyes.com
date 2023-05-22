import { slug } from "github-slugger";

import { allBlogs } from "contentlayer/generated";

export async function getAllTags(): Promise<Record<string, number>> {
  const tagCounts: Record<string, number> = {};

  for (const blog of allBlogs) {
    if (!blog.tags) continue;

    for (const tag of blog.tags) {
      const formattedTag = slug(tag);
      if (formattedTag in tagCounts) {
        tagCounts[formattedTag] += 1;
      } else {
        tagCounts[formattedTag] = 1;
      }
    }
  }

  return tagCounts;
}
