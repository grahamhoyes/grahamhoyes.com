import { allBlogs, allAuthors, allRecipes } from "contentlayer/generated";
import { Blog, Author, Recipe } from "contentlayer/generated";

import siteMetadata from "@/data/siteMetadata";
import { createSlug } from "@/lib/utils/titles";

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

// Unique recipe categories, sorted by counts
export interface RecipeCategory {
  // Category, lower cased
  category: string;
  count: number;
  slug: string;
}

export const recipeCategories: RecipeCategory[] = (() => {
  const categoryCounts = allRecipes.reduce(
    (counts: Map<string, number>, recipe: Recipe) => {
      recipe.categories.forEach((category: string) => {
        const key = category.toLowerCase();
        counts.set(key, (counts.get(key) || 0) + 1);
      });
      return counts;
    },
    new Map<string, number>(),
  );

  return Array.from(categoryCounts.entries())
    .map(([category, count]) => ({
      category,
      count,
      slug: createSlug(category),
    }))
    .sort((a, b) => b.count - a.count);
})();

// Map from category slug to category
export const recipeCategoryMap = (() => {
  const categoryMap = new Map<string, RecipeCategory>();
  recipeCategories.forEach((category) => {
    categoryMap.set(category.slug, category);
  });
  return categoryMap;
})();
