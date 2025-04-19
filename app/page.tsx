import Link from "@/components/Link";
import PostList from "@/components/PostList";
import PageTitle from "@/components/PageTitle";
import siteMetadata from "@/data/siteMetadata";

import { sortedBlogs } from "@/data/generated";

const MAX_DISPLAY = 5;

const Home = () => {
  return (
    <>
      <div className="divide-y divide-light-200 dark:divide-dark-700">
        <div className="space-y-2 pt-2 pb-2 md:space-y-5">
          <PageTitle>Latest</PageTitle>
          <p className="text-lg leading-7 text-light-500 dark:text-dark-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-light-200 dark:divide-dark-700">
          <PostList posts={sortedBlogs.slice(0, MAX_DISPLAY)} />
        </ul>
      </div>
      {sortedBlogs.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
