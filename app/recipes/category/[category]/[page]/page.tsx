import { Metadata } from "next";
import { allRecipes } from "contentlayer/generated";
import ListPage from "@/app/recipes/ListPage";

import { createSlugMap, titleCase } from "@/lib/utils/titles";

const RECIPES_PER_PAGE = 12;

const categories = Array.from(
  new Set(
    allRecipes.flatMap((recipe) =>
      recipe.categories.map((c) => c.toLowerCase()),
    ),
  ),
);
const slugMap = createSlugMap(categories);

const PaginatedCategoryPage = ({
  params: { category: categorySlug, page },
}: {
  params: { category: string; page: string };
}) => {
  const currentPage = parseInt(page, 10);
  const categoryName = slugMap.get(categorySlug) || categorySlug;

  return (
    <ListPage
      name={categoryName}
      recipes={allRecipes}
      filterFunc={(recipe) =>
        recipe.categories.some((cat) => cat.toLowerCase() === categoryName)
      }
      currentPage={currentPage}
      basePath={`/recipes/category/${categorySlug}`}
      recipesPerPage={RECIPES_PER_PAGE}
    />
  );
};

export default PaginatedCategoryPage;

export const generateStaticParams = async () => {
  const params: { category: string; page: string }[] = [];

  for (const category of slugMap.keys()) {
    const categoryRecipes = allRecipes.filter((recipe) =>
      recipe.categories.some(
        (cat) => cat.toLowerCase() === slugMap.get(category),
      ),
    );
    const totalPages = Math.ceil(categoryRecipes.length / RECIPES_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      params.push({ category, page: page.toString() });
    }
  }

  return params;
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string; page: string };
}): Metadata => {
  const categoryName = titleCase(
    slugMap.get(params.category) || params.category,
  );

  return {
    title: `${categoryName} Recipes - Page ${params.page} - Graham Hoyes`,
    description: `${categoryName.toLowerCase()} recipes - Page ${params.page}`,
  };
};
