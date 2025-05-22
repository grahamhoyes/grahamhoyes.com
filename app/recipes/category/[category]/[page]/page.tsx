import { Metadata } from "next";
import { sortedRecipes, recipeCategoryMap } from "@/data/generated";
import ListPage from "@/app/recipes/ListPage";

import { titleCase } from "@/lib/utils/titles";

const RECIPES_PER_PAGE = 12;

interface Params {
  category: string;
  page: string;
}

interface PaginatedCategoryPageProps {
  params: Promise<Params>;
}

const PaginatedCategoryPage = async (props: PaginatedCategoryPageProps) => {
  const params = await props.params;

  const { category: categorySlug, page } = params;

  const currentPage = parseInt(page, 10);
  const categoryName =
    recipeCategoryMap.get(categorySlug)?.category || categorySlug;

  return (
    <ListPage
      name={categoryName}
      recipes={sortedRecipes}
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

export const generateStaticParams = (): Params[] => {
  const params: { category: string; page: string }[] = [];

  for (const [slug, { category }] of recipeCategoryMap.entries()) {
    const categoryRecipes = sortedRecipes.filter((recipe) =>
      recipe.categories.some((cat) => cat.toLowerCase() === category),
    );
    const totalPages = Math.ceil(categoryRecipes.length / RECIPES_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      params.push({ category: slug, page: page.toString() });
    }
  }

  return params;
};

export const generateMetadata = async (
  props: PaginatedCategoryPageProps,
): Promise<Metadata> => {
  const params = await props.params;
  const categoryName = titleCase(
    recipeCategoryMap.get(params.category)?.category || params.category,
  );

  return {
    title: `${categoryName} Recipes - Page ${params.page} - Graham Hoyes`,
    description: `${categoryName.toLowerCase()} recipes - Page ${params.page}`,
  };
};
