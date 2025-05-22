import Link from "@/components/Link";
import PostList from "@/components/PostList";
import Page from "@/components/Page";
import siteMetadata from "@/data/siteMetadata";

import { sortedBlogs } from "@/data/generated";

const MAX_DISPLAY = 5;

const Home = () => {
  return (
    <Page title="Latest" description={siteMetadata.description}>
      <ul className="divide-y divide-light-200 dark:divide-dark-700">
        <PostList posts={sortedBlogs.slice(0, MAX_DISPLAY)} />
      </ul>
      {sortedBlogs.length > MAX_DISPLAY && (
        <div className="mt-4 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </Page>
  );
};

export default Home;
