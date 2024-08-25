import { CardList } from "./RecipeCard";
import { Recipe } from "contentlayer/generated";
import Link from "next/link";

import { createSlug, titleCase } from "@/lib/utils/titles";

interface CategorySectionProps {
  category: string;
  recipes: Recipe[];
}

const CategorySection = ({ category, recipes }: CategorySectionProps) => {
  return (
    <section className="py-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{titleCase(category)}</h2>
        <Link
          href={`/recipes/category/${createSlug(category)}`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          View All
        </Link>
      </div>
      <CardList recipes={recipes} />
    </section>
  );
};

export default CategorySection;
