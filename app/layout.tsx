import { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";

import "@/css/tailwind.css";
import "@/css/prism.css";
import "@/css/styles.css";
import "katex/dist/katex.css";
import "@fontsource/inter/variable-full.css";

import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";

import Providers from "app/Providers";
import Link from "@/components/Link";
import ThemeSwitch from "@/components/ThemeSwitch";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Graham Hoyes",
  authors: { name: "Graham Hoyes" },
  description: "The personal antics of Graham Hoyes",

  icons: {
    icon: [
      { url: "/static/favicons/favicon-16x16.png", sizes: "16x16" },
      { url: "/static/favicons/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: {
      url: "/static/favicons/apple-touch-icon.png",
      sizes: "76x76",
    },
  },

  manifest: "/static/favicons/site.webmanifest",

  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },

  openGraph: {
    title: "Graham Hoyes",
    url: "https://grahamhoyes.com",
    siteName: "grahamhoyes.com",
    images: [
      {
        url: "/static/images/twitter-card.png",
        width: 1200,
        height: 600,
      },
    ],
  },

  metadataBase: new URL(
    process.env.CF_PAGES_URL ||
    `https://${process.env.VERCEL_URL}` ||
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : siteMetadata.siteUrl,
  ),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${source_code_pro.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-light-900 antialiased dark:bg-dark-900 dark:text-dark-50">
        <Providers defaultTheme={siteMetadata.theme}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
            <div className="flex h-screen flex-col justify-between">
              <header className="sticky top-0 z-40 flex h-[4.5rem] items-center justify-between bg-white py-5 dark:bg-dark-900 sm:relative sm:top-auto sm:py-10">
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
                      <div
                        className="h-6 text-2xl font-semibold sm:block"
                        style={{ lineHeight: 1 }}
                      >
                        {siteMetadata.headerTitle}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center text-base leading-5">
                  <div className="hidden sm:block">
                    {headerNavLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="mx-1 rounded-lg p-3 font-medium text-light-900 transition-colors hover:bg-dark-200 dark:text-dark-100 dark:hover:bg-dark-600"
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
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#000000",
};
