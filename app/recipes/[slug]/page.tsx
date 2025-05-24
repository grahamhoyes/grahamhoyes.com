import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sortedRecipes, authors } from "@/data/generated";
import Link from "@/components/Link";
import MdxRenderer from "@/components/Mdx";
import Page from "@/components/Page";
import siteMetadata from "@/data/siteMetadata";
import { titleCase, createSlug } from "@/lib/utils/titles";
import { localToUtcDate } from "@/lib/utils/formatDate";

interface Params {
  slug: string;
}

interface RecipeProps {
  params: Promise<Params>;
}

const Recipe = async (props: RecipeProps) => {
  const params = await props.params;
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

export const generateStaticParams = (): Params[] => {
  return sortedRecipes.map(({ slug }) => ({
    slug,
  }));
};

export const generateMetadata = async (
  props: RecipeProps,
): Promise<Metadata> => {
  const params = await props.params;
  const recipe = sortedRecipes.find((recipe) => recipe.slug === params.slug);

  if (!recipe) return {};

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      type: "article",
      title: recipe.title,
      description: recipe.description,
      url: `${siteMetadata.siteUrl}/recipes/${recipe.slug}`,
      authors: (recipe.authors || ["default"]).map(
        (author) => authors[author].name,
      ),
      tags: recipe.categories,
      publishedTime: localToUtcDate(recipe.date),
      modifiedTime: localToUtcDate(recipe.updated || recipe.date),
      locale: siteMetadata.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
    },
  };
};
