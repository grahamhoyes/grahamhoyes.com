import { CardList } from "./RecipeCard";
import Pagination from "@/components/Pagination";
import { Recipe } from "contentlayer/generated";
import { titleCase } from "@/lib/utils/titles";
import Page from "@/components/Page";

interface ListPageProps {
  name: string;
  recipes: Recipe[];
  filterFunc: (recipeCard: Recipe) => boolean;
  currentPage: number;
  basePath: string;
  recipesPerPage: number;
}

const ListPage = ({
  name,
  recipes,
  filterFunc,
  currentPage,
  basePath,
  recipesPerPage,
}: ListPageProps) => {
  const filteredRecipes = recipes
    .filter(filterFunc)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const displayRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage,
  );

  return (
    <Page title={`${titleCase(name)} Recipes`}>
      <CardList recipes={displayRecipes} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </Page>
  );
};

export default ListPage;
