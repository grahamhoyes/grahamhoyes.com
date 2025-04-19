import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-light-900 dark:text-dark-100 sm:leading-10 md:leading-14">
      {children}
    </h1>
  );
}
