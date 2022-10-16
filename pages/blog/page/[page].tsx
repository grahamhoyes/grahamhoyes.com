import { ComponentProps } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import ListLayout from "@/layouts/ListLayout";
import { PostFrontMatter } from "types/FrontMatter";

import { POSTS_PER_PAGE } from "../../blog";

interface PostPageProps {
  posts: PostFrontMatter[];
  initialDisplayPosts: PostFrontMatter[];
  pagination: ComponentProps<typeof ListLayout>["pagination"];
}

const PostPage = ({
  posts,
  initialDisplayPosts,
  pagination,
}: PostPageProps) => {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const allPosts = getAllFilesFrontMatter("blog");
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { page: string }
> = async (context) => {
  const {
    params: { page },
  } = context;
  const posts = getAllFilesFrontMatter("blog");
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
};

export default PostPage;
