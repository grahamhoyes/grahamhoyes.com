import { Metadata } from "next";
import { allRecipes } from "contentlayer/generated";
import ListPage from "@/app/recipes/ListPage";

import { createSlugMap, titleCase } from "@/lib/utils/titles";

const RECIPES_PER_PAGE = 12;

// Because this is a server component, we can compute these at build time
const categories = Array.from(
  new Set(
    allRecipes.flatMap((recipe) =>
      recipe.categories.map((c) => c.toLowerCase()),
    ),
  ),
);
const slugMap = createSlugMap(categories);

interface Params {
  category: string;
}

interface CategoryPageProps {
  params: Promise<Params>;
}

const CategoryPage = async (props: CategoryPageProps) => {
  const params = await props.params;

  const { category: categorySlug } = params;

  const categoryName = slugMap.get(categorySlug) || categorySlug;

  return (
    <ListPage
      name={categoryName}
      recipes={allRecipes}
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
  return Array.from(slugMap.keys()).map((slug) => ({
    category: slug,
  }));
};

export const generateMetadata = async (
  props: CategoryPageProps,
): Promise<Metadata> => {
  const params = await props.params;
  const categoryName = titleCase(
    slugMap.get(params.category) || params.category,
  );

  return {
    title: `${categoryName} Recipes - Graham Hoyes`,
    description: `${categoryName.toLowerCase()} recipes`,
  };
};
