import { Metadata } from "next";

import { sortedBlogs } from "@/data/generated";
import siteMetadata from "@/data/siteMetadata";

import PostList, { POSTS_PER_PAGE } from "@/components/PostList";

export const metadata: Metadata = {
  title: `Blog | ${siteMetadata.title}`,
};

const Blog = () => {
  const initialDisplayPosts = sortedBlogs.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(sortedBlogs.length / POSTS_PER_PAGE),
  };

  return <PostList posts={initialDisplayPosts} pagination={pagination} />;
};

export default Blog;
