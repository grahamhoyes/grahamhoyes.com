import { ReactNode } from "react";
import GithubSlugger from "github-slugger";

interface IngredientsProps {
  children: ReactNode;
  title?: string;
}

export const Ingredients = ({ children, title }: IngredientsProps) => {
  const slugger = new GithubSlugger();

  title = title ?? "Ingredients";
  const slug = slugger.slug(title);

  return (
    <>
      <div className="lg:col-span-1">
        <div className="rounded-lg lg:sticky lg:top-10 lg:h-fit">
          <h2
            className="mt-0 mb-4 text-3xl font-bold leading-tight tracking-tight text-light-900 dark:text-dark-100"
            id={slug}
          >
            {title}
            <a href={"#" + slug} tabIndex={-1}>
              <span className="icon icon-link" />
            </a>
          </h2>
          <div className="text-base leading-relaxed">{children}</div>
        </div>
      </div>
      {/* Divider for mobile view */}
      <div className="relative mt-2 mb-4 py-4 lg:hidden">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-light-200 dark:border-dark-700" />
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
  const slugger = new GithubSlugger();
  const slug = slugger.slug(title);

  return (
    <div className="mx-auto lg:col-span-2">
      <h2
        className="mt-0 mb-4 text-3xl font-bold leading-tight tracking-tight text-light-900 dark:text-dark-100"
        id={slug}
      >
        {title}
        <a href={"#" + slug} aria-hidden="true" tabIndex={-1}>
          <span className="icon icon-link" />
        </a>
      </h2>
      <div className="prose-headings:font-semibold prose-headings:text-dark-900 prose-p:text-base prose-p:leading-relaxed prose-ol:mt-4 prose-ol:list-decimal prose-ol:text-base prose-ol:leading-relaxed prose-ul:mt-4 prose-ul:list-disc prose-ul:text-base prose-ul:leading-relaxed dark:prose-headings:text-white">
        {children}
      </div>
    </div>
  );
};
