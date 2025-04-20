import { ReactNode } from "react";
import PageTitle from "./PageTitle";

interface PageProps {
  children: ReactNode;
  title?: string;
  description?: string;
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
 * @param className - Additional CSS classes for the page container
 * @param noDivide - Whether to remove the divider between header and content (default: false)
 * @param noContentPadding - Whether to remove padding from the content section (default: false)
 */
const Page = ({
  children,
  title,
  description,
  className = "",
  noDivide = false,
  noContentPadding = false,
}: PageProps) => {
  return (
    <div
      className={`${
        !noDivide
          ? "space-y-2 divide-y divide-light-200 dark:divide-dark-700"
          : ""
      } ${className}`}
    >
      {(title || description) && (
        <div className="space-y-2 pt-2 pb-2">
          {title && <PageTitle>{title}</PageTitle>}
          {description && (
            <p className="text-lg leading-7 text-light-600 dark:text-dark-400">
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
