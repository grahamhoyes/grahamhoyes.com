import { Metadata } from "next";
import { allRecipes } from "contentlayer/generated";
import { CardList } from "./RecipeCard";
import CategorySection from "./CategorySection";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Recipes - Graham Hoyes",
  description: "A collection of recipes",
};

const MAX_RECIPES = 6;

const RecipesPage = ({ params }: { params: { page: string } }) => {
  const page = parseInt(params.page) || 1;
  const sortedRecipes = allRecipes
    .flatMap((r) => [r, r, r, r, r, r, r])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get all unique categories (case-insensitive)
  const categories = Array.from(
    new Set(
      allRecipes.flatMap((recipe) =>
        recipe.categories.map((c) => c.toLowerCase()),
      ),
    ),
  );
  const topCategories = categories.slice(0, 5);

  return (
    <div className="container mx-auto space-y-4 divide-y px-4">
      <div className="space-y-2 pt-2 pb-2 md:space-y-5">
        <h1 className="text-3xl font-bold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Recipes
        </h1>
      </div>

      <section className="py-4">
        <h2 className="mb-4 text-2xl font-semibold">Recent Recipes</h2>
        <CardList recipes={sortedRecipes.slice(0, MAX_RECIPES)} />
      </section>

      {topCategories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          recipes={sortedRecipes
            .filter((r) =>
              r.categories.some((c) => c.toLowerCase() === category),
            )
            .slice(0, MAX_RECIPES)}
        />
      ))}

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(sortedRecipes.length / MAX_RECIPES)}
        basePath="/recipes"
      />
    </div>
  );
};

export default RecipesPage;
