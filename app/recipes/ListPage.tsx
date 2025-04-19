import { CardList } from "./RecipeCard";
import Pagination from "@/components/Pagination";
import { Recipe } from "contentlayer/generated";
import { titleCase } from "@/lib/utils/titles";
import PageTitle from "@/components/PageTitle";

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
    <div className="container mx-auto px-4">
      <div className="space-y-1">
        <PageTitle>{titleCase(name)} Recipes</PageTitle>
      </div>

      <CardList recipes={displayRecipes} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
};

export default ListPage;
