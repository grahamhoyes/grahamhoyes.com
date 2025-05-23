import { Metadata } from "next";

import { sortedBlogs } from "@/data/generated";

import PostList, { POSTS_PER_PAGE } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Blog | Graham Hoyes",
};

interface Params {
  page: string;
}

interface BlogListProps {
  params: Promise<Params>;
}

const BlogList = async (props: BlogListProps) => {
  const params = await props.params;

  const { page } = params;

  const pageNumber = parseInt(page);

  const posts = sortedBlogs.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(sortedBlogs.length / POSTS_PER_PAGE),
  };

  return <PostList posts={posts} pagination={pagination} />;
};

export const generateStaticParams = (): Params[] => {
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
};

export default BlogList;
