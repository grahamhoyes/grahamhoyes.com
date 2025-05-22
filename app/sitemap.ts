import { MetadataRoute } from "next";
import { allBlogs, allRecipes, recipeCategories } from "@/data/generated";
import siteMetadata from "@/data/siteMetadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.updated || post.date,
    }));

  const recipeRoutes = allRecipes.map((recipe) => ({
    url: `${siteUrl}/${recipe.path}`,
    lastModified: recipe.updated || recipe.date,
  }));

  const recipeCategoryRoutes = recipeCategories.map((category) => ({
    url: `${siteUrl}/recipes/category/${category.slug}`,
    lastModified:
      allRecipes
        .filter((recipe) =>
          recipe.categories.some(
            (recipeCategory) =>
              recipeCategory.toLowerCase() === category.category,
          ),
        )
        .map((recipe) => recipe.updated || recipe.date)
        .sort()
        .reverse()[0] || new Date(),
  }));

  const pages = ["", "blog", "projects", "recipes", "about"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
  }));

  return [...pages, ...blogRoutes, ...recipeRoutes, ...recipeCategoryRoutes];
}
