import { allBlogs, allAuthors, allRecipes } from "contentlayer/generated";
import { Blog, Author, Recipe } from "contentlayer/generated";

import siteMetadata from "@/data/siteMetadata";

export { allBlogs, allAuthors, allRecipes };
export type { Blog, Author, Recipe };

// Transforms on stuff generated from contentlayer
export const dateSortDesc = (a: string, b: string) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

// Blogs sorted in descending order, with drafts removed
export const sortedBlogs = allBlogs
  .filter((post) => post.draft !== true)
  .sort((a, b) => dateSortDesc(a.date, b.date));

// Authors mapped by name
export const authors: { [key: string]: Author } = (() => {
  const authorMap = Object.fromEntries(
    allAuthors.map((author) => [author.name, author]),
  );
  authorMap["default"] = authorMap[siteMetadata.author];
  return authorMap;
})();

// Recipes sorted in descending order
export const sortedRecipes = allRecipes.sort((a, b) =>
  dateSortDesc(a.date, b.date),
);
