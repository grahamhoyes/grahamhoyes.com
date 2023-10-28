import { ReactNode } from "react";
import slugger from "github-slugger";

interface IngredientsProps {
  children: ReactNode;
  title?: string;
}

export const Ingredients = ({ children, title }: IngredientsProps) => {
  title = title ?? "Ingredients";
  const slug = slugger.slug(title);

  return (
    <>
      <div className="lg:sticky lg:top-0 lg:col-span-1 lg:h-fit lg:pt-10">
        <h1 className="mt-0" id={slug}>
          Ingredients
          <a href={"#" + slug} aria-hidden="true" tabIndex={-1}>
            <span className="icon icon-link"></span>
          </a>
        </h1>
        {children}
      </div>
      <div className="relative mt-2 mb-4 py-4 lg:hidden">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-light-200 dark:border-dark-400" />
        </div>
      </div>
    </>
  );
};

interface StepsProps {
  children: ReactNode;
  title?: string;
}

export const Steps = ({ children, title }: StepsProps) => {
  title = title ?? "Steps";
  const slug = slugger.slug(title);

  return (
    <div className="mx-auto lg:col-span-3 lg:pt-10">
      <h1 className="mt-0" id={slug}>
        Steps
        <a href={"#" + slug} aria-hidden="true" tabIndex={-1}>
          <span className="icon icon-link"></span>
        </a>
      </h1>
      {children}
    </div>
  );
};
