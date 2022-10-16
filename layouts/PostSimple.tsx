import { ReactNode } from "react";

import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import formatDate from "@/lib/utils/formatDate";
import ScrollTop from "@/components/ScrollTop";
import { PostFrontMatter } from "types/FrontMatter";

interface PostSimpleLayoutProps {
  frontMatter: PostFrontMatter;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  children: ReactNode;
}

const PostSimpleLayout = ({
  frontMatter,
  next,
  prev,
  children,
}: PostSimpleLayoutProps) => {
  const { date, title, slug } = frontMatter;

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-light-200 pb-10 text-center dark:border-dark-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-light-500 dark:text-dark-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-light-200 pb-8 dark:divide-dark-700 xl:divide-y-0 "
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <div className="divide-y divide-light-200 dark:divide-dark-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {children}
              </div>
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
};

export default PostSimpleLayout;
