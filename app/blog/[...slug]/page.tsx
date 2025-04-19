import fs from "fs";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import Image from "@/components/Image";
import ScrollTop from "@/components/ScrollTop";
import MdxRenderer from "@/components/Mdx";
import siteMetadata from "@/data/siteMetadata";

import { sortedBlogs, authors } from "@/data/generated";
import generateRss from "@/lib/generate-rss";

// "Saturday, July 1st, 2023"
const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface PostProps {
  params: { slug: string[] };
}

const Post = ({ params }: PostProps) => {
  const slug = params.slug.join("/");

  const postIndex = sortedBlogs.findIndex((p) => p.slug === slug);

  if (postIndex < 0) notFound();

  const post = sortedBlogs[postIndex];
  const postAuthors = post.authors || [siteMetadata.author];
  const authorDetails = postAuthors.map((authorName) => authors[authorName]);

  const { filePath, date, title, draft } = post;

  if (draft) notFound();

  const prevPost = sortedBlogs[postIndex + 1] || null;
  const nextPost = sortedBlogs[postIndex - 1] || null;

  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div className="xl:divide-y xl:divide-light-200 xl:dark:divide-dark-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(
                    siteMetadata.locale,
                    postDateTemplate,
                  )}
                </time>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-light-200 pb-8 dark:divide-dark-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-light-200 xl:pt-11 xl:dark:border-dark-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38"
                          height="38"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-light-900 dark:text-dark-100">
                          {author.name}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-light-200 dark:divide-dark-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                <MdxRenderer code={post.body.code} toc={post.toc} />
              </div>
              <div className="pt-6 pb-6 text-sm text-dark-700 dark:text-dark-300">
                <Link
                  href={`${siteMetadata.siteRepo}/blob/main/data/${filePath}`}
                >
                  {"View on GitHub"}
                </Link>
              </div>
            </div>
            <footer>
              <div className="divide-light-200 text-sm font-medium leading-5 dark:divide-dark-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {(nextPost || prevPost) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {nextPost && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-light-500 dark:text-dark-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${nextPost.slug}`}>
                            {nextPost.title}
                          </Link>
                        </div>
                      </div>
                    )}
                    {prevPost && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-light-500 dark:text-dark-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prevPost.slug}`}>
                            {prevPost.title}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
};

export default Post;

export const generateStaticParams = (): PostProps["params"][] => {
  // Write rss TODO: Do this somewhere else
  if (sortedBlogs.length > 0) {
    const rss = generateRss(sortedBlogs);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return sortedBlogs.map(({ slug }) => ({
    slug: slug.split("/"),
  }));
};

export const generateMetadata = ({ params }: PostProps): Metadata => {
  const post = sortedBlogs.find((p) => p.slug === params.slug.join("/"));

  if (!post) return {};

  return {
    title: `${post.title} | ${siteMetadata.title}`,
    openGraph: {
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.lastmod || post.date).toISOString(),
      authors: (post.authors || ["default"]).map(
        (author) => authors[author].name,
      ),
      tags: post.tags,
    },
  };
};
