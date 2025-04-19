import { ReactNode } from "react";

interface SubsectionTitleProps {
  children: ReactNode;
}

export default function SubsectionTitle({ children }: SubsectionTitleProps) {
  return (
    <h3 className="text-2xl font-semibold leading-tight text-light-900 dark:text-dark-100">
      {children}
    </h3>
  );
}
