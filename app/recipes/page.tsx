import { Metadata } from "next";

import { allRecipes } from "contentlayer/generated";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Recipes - Graham Hoyes",
};

const Recipes = () => {
  return <div className="divide-y divide-light-200 dark:divide-dark-700">
    <div className="container py-12">
      <div className="-m-4 flex flex-wrap">
        {allRecipes.map((recipe, idx) => (
          <Card key={idx} title={recipe.title} href={recipe.} />
        ))}
      </div>
    </div>
  </div>;
};

export default Recipes;
