import fs from "fs";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import Link from "@/components/Link";
import Page from "@/components/Page";
import Comments from "@/components/Comments";
import ScrollTop from "@/components/ScrollTop";
import MdxRenderer from "@/components/Mdx";
import siteMetadata from "@/data/siteMetadata";
import { titleCase } from "@/lib/utils/titles";
import { localToUtcDate } from "@/lib/utils/formatDate";

import { sortedBlogs, authors } from "@/data/generated";
import generateRss from "@/lib/generate-rss";

interface Params {
  slug: string[];
}

interface PostProps {
  params: Promise<Params>;
}

const Post = async (props: PostProps) => {
  const params = await props.params;
  const slug = params.slug.join("/");

  const postIndex = sortedBlogs.findIndex((p) => p.slug === slug);

  if (postIndex < 0) notFound();

  const post = sortedBlogs[postIndex];

  const { filePath, date, updated, title, tags, draft } = post;

  if (draft) notFound();

  const prevPost = sortedBlogs[postIndex + 1] || null;
  const nextPost = sortedBlogs[postIndex - 1] || null;

  return (
    <Page
      noContentPadding
      title={title}
      createdAt={date}
      updatedAt={updated}
      chips={tags?.map((tag) => ({
        name: titleCase(tag),
        // TODO: Replace with tag page
        // href: slug,
      }))}
      // breadcrumb={{
      //   text: "Back to the Blog",
      //   href: "/blog",
      // }}
    >
      <ScrollTop />
      <article>
        <div className="xl:divide-y xl:divide-light-200 xl:dark:divide-dark-700">
          <div className="divide-y divide-light-200 pb-8 dark:divide-dark-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-light-200 dark:divide-dark-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none py-8 dark:prose-dark">
                <MdxRenderer code={post.body.code} toc={post.toc} />
              </div>
              <div className="pt-4 text-center">
                <Comments />
              </div>
            </div>

            <footer className="divide-light-200 dark:divide-dark-700 xl:divide-y mt-4 xl:mt-0">
              {(nextPost || prevPost) && (
                <div
                  className={`flex ${
                    prevPost && !nextPost ? "flex-row" : "flex-row-reverse"
                  } justify-between py-4 text-sm font-medium xl:flex-col xl:space-y-8 xl:py-8`}
                >
                  {nextPost && (
                    <div>
                      <h2 className="text-xs text-right xl:text-left uppercase tracking-wide text-light-700 dark:text-dark-300">
                        Next Article
                      </h2>
                      <div className="text-right xl:text-left text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${nextPost.slug}`}>
                          {nextPost.title}
                        </Link>
                      </div>
                    </div>
                  )}
                  {prevPost && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-light-700 dark:text-dark-300">
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

              <div className="py-2 xl:py-6">
                <Link
                  href={`${siteMetadata.siteRepo}/blob/main/data/${filePath}`}
                  className="text-sm text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  View on GitHub
                </Link>
              </div>

              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <ArrowLeftIcon className="mr-1 h-4 w-4" />
                  Back to the Blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </Page>
  );
};

export default Post;

export const generateStaticParams = (): Params[] => {
  // Write rss TODO: Do this somewhere else
  if (sortedBlogs.length > 0) {
    const rss = generateRss(sortedBlogs);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return sortedBlogs.map(({ slug }) => ({
    slug: slug.split("/"),
  }));
};

export const generateMetadata = async (props: PostProps): Promise<Metadata> => {
  const params = await props.params;
  const post = sortedBlogs.find((p) => p.slug === params.slug.join("/"));

  if (!post) return {};

  return {
    title: `${post.title} | ${siteMetadata.title}`,
    description: post.summary,
    openGraph: {
      type: "article",
      publishedTime: localToUtcDate(post.date),
      modifiedTime: localToUtcDate(post.updated || post.date),
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      authors: (post.authors || ["default"]).map(
        (author) => authors[author].name,
      ),
      tags: post.tags,
      title: post.title,
      description: post.summary,
      locale: siteMetadata.locale,
    },
  };
};
