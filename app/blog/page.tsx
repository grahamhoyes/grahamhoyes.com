import { Metadata } from "next";

import { sortedBlogs } from "@/data/generated";
import siteMetadata from "@/data/siteMetadata";
import Page from "@/components/Page";

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

  return (
    <Page title="Blog">
      <PostList posts={initialDisplayPosts} pagination={pagination} />
    </Page>
  );
};

export default Blog;
