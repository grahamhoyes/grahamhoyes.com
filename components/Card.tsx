import { ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "./Image";
import Link from "./Link";

type MaybeLinkProps = {
  children: ReactNode;
  href?: string;
  label?: string;
};

const MaybeLink = ({ children, href, label }: MaybeLinkProps) => {
  return href ? (
    <Link href={href} aria-label={label}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

type CardProps = {
  title: string;
  imgSrc?: string;
  href: string;
  children?: ReactNode;
  linkText?: string;
  imageAnchor?: string;
};

const Card = ({
  title,
  children,
  imgSrc,
  href,
  linkText,
  imageAnchor,
}: CardProps) => (
  <div className="flux h-full flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-dark-800">
    {imgSrc && (
      <div className="h-48 w-full flex-shrink-0">
        <MaybeLink href={href} label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className={`h-full w-full object-cover ${
              imageAnchor || "object-top"
            }`}
            width={544}
            height={400}
          />
        </MaybeLink>
      </div>
    )}

    <div className="flex flex-grow flex-col p-4">
      <MaybeLink href={href} aria-label={`Link to ${title}`}>
        <h2 className="mb-3 text-2xl font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400">
          {title}
        </h2>
      </MaybeLink>
      {children}
      {href && (
        <Link
          href={href}
          className="mt-4 inline-flex items-center text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label={`Link to ${title}`}
        >
          {linkText || "Learn more"} <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  </div>
);

export default Card;
