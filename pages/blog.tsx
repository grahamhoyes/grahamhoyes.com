import { ComponentProps } from "react";
import { GetStaticProps } from "next";

import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import { PostFrontMatter } from "types/FrontMatter";

export const POSTS_PER_PAGE = 5;

interface BlogProps {
  posts: PostFrontMatter[];
  initialDisplayPosts: PostFrontMatter[];
  pagination: ComponentProps<typeof ListLayout>["pagination"];
}

const Blog = ({ posts, initialDisplayPosts, pagination }: BlogProps) => {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
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

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getAllFilesFrontMatter("blog");
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination } };
};

export default Blog;
