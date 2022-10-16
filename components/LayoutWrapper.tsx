import { ReactNode } from "react";
import Image from "next/future/image";

import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";

import Link from "./Link";
import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="sticky top-0 z-40 flex items-center justify-between bg-white py-5 dark:bg-gray-900 sm:relative sm:top-auto sm:py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Image
                    src={siteMetadata.siteLogo}
                    alt={siteMetadata.title}
                    width="24"
                    height="24"
                    quality="100"
                    style={{ verticalAlign: "middle" }}
                    unoptimized={true}
                  />
                </div>
                {typeof siteMetadata.headerTitle === "string" ? (
                  <div
                    className="hidden h-6 text-2xl font-semibold sm:block"
                    style={{ lineHeight: 1 }}
                  >
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
