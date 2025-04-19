import { Metadata } from "next";

import { sortedBlogs } from "@/data/generated";
import siteMetadata from "@/data/siteMetadata";
import PageTitle from "@/components/PageTitle";

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
    <div className="divide-y divide-light-200 dark:divide-dark-700">
      <div className="space-y-2 pt-2 pb-2 md:space-y-5">
        <PageTitle>Blog</PageTitle>
      </div>
      <PostList posts={initialDisplayPosts} pagination={pagination} />
    </div>
  );
};

export default Blog;
