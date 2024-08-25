import { Metadata } from "next";
import { allRecipes } from "contentlayer/generated";
import { CardList } from "@/app/recipes/RecipeCard";
import Pagination from "@/components/Pagination";

import { createSlugMap, titleCase } from "@/lib/utils/titles";

const RECIPES_PER_PAGE = 2;

// Because this is a server component, we can compute these at build time
const categories = Array.from(
  new Set(
    allRecipes.flatMap((recipe) =>
      recipe.categories.map((c) => c.toLowerCase()),
    ),
  ),
);
const slugMap = createSlugMap(categories);
console.log(slugMap);

const CategoryPage = ({
  params,
}: {
  params: { category: string; page: string };
}) => {
  const { category: categorySlug, page = "1" } = params;
  const currentPage = parseInt(page);
  const categoryName = slugMap.get(categorySlug) || categorySlug;

  const categoryRecipes = allRecipes
    .filter((recipe) =>
      recipe.categories.some((cat) => cat.toLowerCase() === categoryName),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const paginatedRecipes = categoryRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE,
  );

  const totalPages = Math.ceil(categoryRecipes.length / RECIPES_PER_PAGE);

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-8 text-3xl font-bold">
        {titleCase(categoryName)} Recipes
      </h1>

      <CardList recipes={paginatedRecipes} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/recipes/category/${categorySlug}`}
      />
    </div>
  );
};

export default CategoryPage;

export const generateStaticParams = async () => {
  return Array.from(slugMap.keys()).map((slug) => ({
    category: slug,
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string };
}): Metadata => {
  const categoryName = titleCase(
    slugMap.get(params.category) || params.category,
  );

  return {
    title: `${categoryName} Recipes - Graham Hoyes`,
    description: `${categoryName.toLowerCase()} recipes`,
  };
};
