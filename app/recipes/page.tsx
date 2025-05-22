import { Metadata } from "next";
import { sortedRecipes, recipeCategories } from "@/data/generated";
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
  const topCategories = recipeCategories
    .map(({ category }) => category)
    .slice(0, 5);

  console.log(topCategories);

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
