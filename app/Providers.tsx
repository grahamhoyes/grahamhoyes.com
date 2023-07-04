"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface ClientLayoutWrapperProps {
  children: ReactNode;
  defaultTheme: string;
}

/**
 * A client component to provide the theming providers and wrappers we use.
 */
const Providers = ({ children, defaultTheme }: ClientLayoutWrapperProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
