import Link from "next/link";
import Image from "next/image";
import { Recipe } from "contentlayer/generated";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { createSlug, titleCase } from "@/lib/utils/titles";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-dark-800">
      {recipe.thumbnail && (
        <div className="h-48 w-full flex-shrink-0">
          <Image
            src={recipe.thumbnail}
            alt={recipe.title}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-grow flex-col p-4">
        <Link href={`/recipes/${recipe.slug}`} className="group">
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {recipe.title}
          </h3>
        </Link>
        <p className="line-clamp-2 mb-4 flex-grow text-gray-600 dark:text-gray-300">
          {recipe.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {recipe.categories.map((category) => (
            <Link
              key={category}
              href={`/recipes/category/${createSlug(category)}`}
              className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
            >
              {titleCase(category)}
            </Link>
          ))}
        </div>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="mt-auto inline-flex items-center text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Recipe <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;

interface CardListProps {
  recipes: Recipe[];
}

export const CardList = ({ recipes }: CardListProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.slug} recipe={recipe} />
    ))}
  </div>
);
