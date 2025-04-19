import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import MdxRenderer from "@/components/Mdx";

import { sortedRecipes } from "@/data/generated";
import PageTitle from "@/components/PageTitle";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";
import formatDate from "@/lib/utils/formatDate";
import { titleCase, createSlug } from "@/lib/utils/titles";

interface RecipeProps {
  params: {
    slug: string;
  };
}

const Recipe = ({ params }: RecipeProps) => {
  const recipe = sortedRecipes.find((recipe) => recipe.slug === params.slug);

  if (!recipe) notFound();

  return (
    <>
      <div className="mx-auto lg:mx-0 lg:max-w-none">
        <div className="mb-6">
          <Link
            href="/recipes"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Recipes
          </Link>
        </div>

        <div className="space-y-1">
          <PageTitle>{recipe.title}</PageTitle>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>Published {formatDate(recipe.date)}</div>

          <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="mt-4 mb-8 text-lg leading-7">{recipe.description}</div>

        <div className="divide-y divide-light-200 dark:divide-dark-700">
          <div className="prose min-h-[800px] max-w-none pt-6 text-base prose-ul:pl-5 dark:prose-dark lg:divide-y-0 lg:pt-0">
            <div className="lg:grid lg:grid-cols-5 lg:gap-8">
              <MdxRenderer code={recipe.body.code} />
            </div>
          </div>
          <div className="mt-6 pt-6 pb-6 text-sm text-dark-700 dark:text-dark-300">
            <div className="flex justify-between">
              <Link
                href={`${siteMetadata.siteRepo}/blob/main/data/${recipe.filePath}`}
              >
                {"View on GitHub"}
              </Link>
              <Link
                href="/recipes"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Back to Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;

export const generateStaticParams = () => {
  return sortedRecipes.map(({ slug }) => ({
    slug,
  }));
};
