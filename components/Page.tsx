import { ReactNode } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import PageTitle from "./PageTitle";
import formatDate from "@/lib/utils/formatDate";
import Link from "@/components/Link";
import Image from "@/components/Image";
import { titleCase } from "@/lib/utils/titles";
import { authors } from "@/data/generated";

interface Chip {
  name: string;
  href?: string;
}

interface Breadcrumb {
  text: string;
  href: string;
}

interface PageProps {
  children: ReactNode;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  chips?: Chip[];
  breadcrumb?: Breadcrumb;
  author?: string;
  className?: string;
  noDivide?: boolean;
  noContentPadding?: boolean;
  fullWidth?: boolean;
}

/**
 * Consistent page layout component
 *
 * @param children - Page content
 * @param title - Optional page title
 * @param description - Optional page description
 * @param createdAt - Optional creation date
 * @param updatedAt - Optional update date
 * @param chips - Optional array of chips (tags) with name and href
 * @param breadcrumb - Optional breadcrumb for navigation
 * @param author - Optional author name
 * @param className - Additional CSS classes for the page container
 * @param noDivide - Whether to remove the divider between header and content (default: false)
 * @param noContentPadding - Whether to remove padding from the content section (default: false)
 */
const Page = ({
  children,
  title,
  description,
  createdAt,
  updatedAt,
  chips,
  breadcrumb,
  author: authorName,
  className = "",
  noDivide = false,
  noContentPadding = false,
}: PageProps) => {
  const author = authorName ? authors[authorName] : undefined;

  const hasMetadata = !!(createdAt || updatedAt || author);

  return (
    <div
      className={`${
        !noDivide
          ? "space-y-2 divide-y divide-light-200 dark:divide-dark-700"
          : ""
      } ${className}`}
    >
      {(title || description || hasMetadata) && (
        <div className="space-y-2 py-2">
          {breadcrumb && (
            <Link
              href={breadcrumb.href}
              className="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              {breadcrumb.text}
            </Link>
          )}

          {title && <PageTitle>{title}</PageTitle>}

          {hasMetadata && (
            <div className="flex flex-col items-start gap-4 text-sm text-light-600 dark:text-dark-400 md:flex-row md:items-center">
              <div className="flex flex-col items-start gap-2 md:gap-4 md:flex-row md:items-center">
                {createdAt && (
                  <time
                    dateTime={createdAt}
                    aria-label={`Published on ${formatDate(createdAt)}`}
                  >
                    Published {formatDate(createdAt)}
                  </time>
                )}

                {updatedAt && (
                  <time
                    className={`${
                      createdAt ? "-ml-2 md:border-l pl-2" : ""
                    } border-gray-600 dark:border-gray-400`}
                    dateTime={updatedAt}
                    aria-label={`Updated on ${formatDate(updatedAt)}`}
                  >
                    Updated {formatDate(updatedAt)}
                  </time>
                )}
              </div>

              {chips && chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {chips.map(({ name, href }, i) =>
                    href ? (
                      <Link
                        key={i}
                        href={href}
                        className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
                      >
                        {titleCase(name)}
                      </Link>
                    ) : (
                      <p
                        key={i}
                        className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 transition-colors dark:bg-blue-200 dark:text-blue-800"
                      >
                        {titleCase(name)}
                      </p>
                    ),
                  )}
                </div>
              )}

              {author && (
                <div className="flex items-center space-x-2 md:ml-auto">
                  <Image
                    src={author.avatar}
                    alt={`${author.name} avatar`}
                    width="38"
                    height="38"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="whitespace-nowrap text-sm font-medium leading-5">
                    <div className="text-light-900 dark:text-dark-100">
                      {author.name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {description && (
            <p className="leading-7 text-light-800 dark:text-dark-200">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={`${!noContentPadding ? "py-6 md:py-8" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Page;
