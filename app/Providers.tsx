"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// import { ClientReload } from "@/components/ClientReload";

interface ClientLayoutWrapperProps {
  children: ReactNode;
  useClientReload: boolean;
  defaultTheme: string;
}

/**
 * A client component to provide the theming providers and wrappers we use.
 */
const Providers = ({
  children,
  // useClientReload,
  defaultTheme,
}: ClientLayoutWrapperProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={defaultTheme}>
      {/*TODO: Might not need client reloading*/}
      {/*{useClientReload ? <ClientReload /> : null}*/}
      {children}
    </ThemeProvider>
  );
};

export default Providers;
