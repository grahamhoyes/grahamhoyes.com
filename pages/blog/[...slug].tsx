import fs from "fs";
import { GetStaticProps } from "next";

import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "@/lib/mdx";

import { AuthorFrontMatter, PostFrontMatter } from "types/FrontMatter";
import { TocHeading } from "types/Toc";

const DEFAULT_LAYOUT = "PostLayout";

interface PostPointer {
  slug: string;
  title: string;
}

interface BlogProps {
  post: { mdxSource: string; frontMatter: PostFrontMatter; toc: TocHeading[] };
  authorDetails: AuthorFrontMatter[];
  prev?: PostPointer;
  next?: PostPointer;
}

const Blog = ({ post, authorDetails, prev, next }: BlogProps) => {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          exportName="default"
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  const posts = getFiles("blog");
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const slug = (params.slug as string[]).join("/");

  const allPosts = getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === slug,
  );

  const prev: PostPointer = allPosts[postIndex + 1] || null;
  const next: PostPointer = allPosts[postIndex - 1] || null;

  const post = await getFileBySlug("blog", slug);

  const authorList = post.frontMatter.authors || ["default"];

  const authorDetails = await Promise.all(
    authorList.map(async (author) => {
      const authorResults = await getFileBySlug("authors", author);
      return authorResults.frontMatter;
    }),
  );

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return { props: { post, authorDetails, prev, next } };
};

export default Blog;
