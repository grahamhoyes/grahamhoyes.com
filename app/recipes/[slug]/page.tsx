import { notFound } from "next/navigation";

import MdxRenderer from "@/components/Mdx";

import { sortedRecipes } from "@/data/generated";
import Link from "@/components/Link";
import Page from "@/components/Page";
import siteMetadata from "@/data/siteMetadata";
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
    <Page
      title={recipe.title}
      createdAt={recipe.date}
      updatedAt={recipe.updated}
      chips={recipe.categories.map((category) => ({
        name: titleCase(category),
        href: `/recipes/category/${createSlug(category)}`,
      }))}
      breadcrumb={{
        text: "Back to Recipes",
        href: "/recipes",
      }}
      description={recipe.description}
    >
      <div className="space-y-6 divide-y divide-light-200 dark:divide-dark-700">
        {/* Content */}
        <div className="prose min-h-[800px] max-w-none pt-6 text-base prose-ul:pl-5 dark:prose-dark lg:divide-y-0">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <MdxRenderer code={recipe.body.code} />
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 text-sm text-dark-700 dark:text-dark-300">
          <div className="flex justify-between">
            <Link
              href={`${siteMetadata.siteRepo}/blob/main/data/${recipe.filePath}`}
            >
              View on GitHub
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
    </Page>
  );
};

export default Recipe;

export const generateStaticParams = () => {
  return sortedRecipes.map(({ slug }) => ({
    slug,
  }));
};
