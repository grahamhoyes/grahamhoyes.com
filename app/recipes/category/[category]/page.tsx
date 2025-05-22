import { Metadata } from "next";
import {
  sortedRecipes,
  recipeCategories,
  recipeCategoryMap,
} from "@/data/generated";
import ListPage from "@/app/recipes/ListPage";

import { titleCase } from "@/lib/utils/titles";

const RECIPES_PER_PAGE = 12;

interface Params {
  category: string;
}

interface CategoryPageProps {
  params: Promise<Params>;
}

const CategoryPage = async (props: CategoryPageProps) => {
  const params = await props.params;

  const { category: categorySlug } = params;

  const categoryName =
    recipeCategoryMap.get(categorySlug)?.category || categorySlug;

  return (
    <ListPage
      name={categoryName}
      recipes={sortedRecipes}
      filterFunc={(recipe) =>
        recipe.categories.some((cat) => cat.toLowerCase() === categoryName)
      }
      currentPage={1}
      basePath={`/recipes/category/${categorySlug}`}
      recipesPerPage={RECIPES_PER_PAGE}
    />
  );
};

export default CategoryPage;

export const generateStaticParams = (): Params[] => {
  return recipeCategories.map((category) => ({
    category: category.slug,
  }));
};

export const generateMetadata = async (
  props: CategoryPageProps,
): Promise<Metadata> => {
  const params = await props.params;
  const categoryName = titleCase(
    recipeCategoryMap.get(params.category)?.category || params.category,
  );

  return {
    title: `${categoryName} Recipes - Graham Hoyes`,
    description: `${categoryName.toLowerCase()} recipes`,
  };
};
