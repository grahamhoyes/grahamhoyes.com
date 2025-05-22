import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-light-900 dark:text-dark-100">
      {children}
    </h2>
  );
}
