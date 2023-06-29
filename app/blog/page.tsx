import { Metadata } from "next";

import { allBlogs } from "contentlayer/generated";

export const POSTS_PER_PAGE = 5;

const Blog = () => {
  const initialDisplayPosts = allBlogs.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(allBlogs.length / POSTS_PER_PAGE),
  };
};
