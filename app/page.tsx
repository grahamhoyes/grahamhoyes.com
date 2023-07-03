import Link from "@/components/Link";
import PostList from "@/components/PostList";
import siteMetadata from "@/data/siteMetadata";
import formatDate from "@/lib/utils/formatDate";

import { sortedBlogs } from "@/data/generated";

const MAX_DISPLAY = 5;

const Home = () => {
  return (
    <>
      <div className="divide-y divide-light-200 dark:divide-dark-700">
        <div className="space-y-2 pt-2 pb-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest
          </h1>
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
