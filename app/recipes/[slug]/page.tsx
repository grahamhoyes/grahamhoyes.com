import { notFound } from "next/navigation";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

import MdxRenderer from "@/components/Mdx";

import { sortedRecipes } from "@/data/generated";
import PageTitle from "@/components/PageTitle";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";

import JumpTo from "@/components/JumpTo";

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
        <div className="space-y-1 text-center">
          <PageTitle>{recipe.title}</PageTitle>
        </div>
        <div className="mt-9 mb-2 leading-7">{recipe.description}</div>
        <div className="divide-y divide-light-200 dark:divide-dark-700">
          <div className="prose max-w-none gap-8 pt-10 text-base prose-ul:pl-5 dark:prose-dark lg:grid lg:grid-cols-4 lg:divide-y-0 lg:pt-0">
            <MdxRenderer code={recipe.body.code} />
          </div>
          <div className="pt-6 pb-6 text-sm text-dark-700 dark:text-dark-300">
            <Link
              href={`${siteMetadata.siteRepo}/blob/main/data/${recipe.filePath}`}
            >
              {"View on GitHub"}
            </Link>
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
