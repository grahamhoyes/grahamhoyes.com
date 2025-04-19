import { Metadata } from "next";
import { allRecipes } from "contentlayer/generated";
import { CardList } from "./RecipeCard";
import CategorySection from "./CategorySection";
import Page from "@/components/Page";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Recipes - Graham Hoyes",
  description: "A collection of recipes",
};

const MAX_RECIPES = 6;

const RecipesPage = () => {
  const sortedRecipes = allRecipes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
    <Page title="Recipes">
      <section className="py-4">
        <SectionTitle>Recent Recipes</SectionTitle>
        <div className="mt-4">
          <CardList recipes={sortedRecipes.slice(0, MAX_RECIPES)} />
        </div>
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
    </Page>
  );
};

export default RecipesPage;
