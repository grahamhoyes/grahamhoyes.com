import { ReactNode } from "react";
import Image from "./Image";
import Link from "./Link";

interface CardContentProps {
  children: ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => (
  <p className="prose mb-3 max-w-none text-light-500 dark:text-dark-400">
    {children}
  </p>
);

type CardProps = {
  title: string;
  description?: string;
  imgSrc: string;
  href: string;
  children?: ReactNode;
  linkText?: string;
  imageAnchor?: string;
};

const Card = ({
  title,
  description,
  children,
  imgSrc,
  href,
  linkText,
  imageAnchor,
}: CardProps) => (
  <div className="md max-w-[544px] p-4 md:w-1/2 xl:w-1/3">
    <div
      className={`${
        imgSrc && "h-full"
      }  overflow-hidden rounded-md border-2 border-light-200 border-opacity-60 dark:border-dark-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className={`max-h-60 object-cover sm:h-60 ${
                imageAnchor || "object-top"
              }`}
              width={544}
              height={400}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className={`lg:h-50 sm:h-50 max-h-60 object-cover ${
              imageAnchor || "object-top"
            }`}
            width={544}
            height={400}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {children || <CardContent>{description}</CardContent>}
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            {linkText || "Learn more"} &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default Card;
