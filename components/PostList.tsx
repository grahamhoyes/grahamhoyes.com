import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Blog } from "contentlayer/generated";
import formatDate from "@/lib/utils/formatDate";
import Link from "@/components/Link";
import SubsectionTitle from "@/components/SubsectionTitle";

export const POSTS_PER_PAGE = 5;

interface PostListProps {
  posts: Blog[];
  pagination?: PaginationProps;
}
export const PostList = ({ posts, pagination }: PostListProps) => (
  <>
    <ul className="divide-y divide-light-200 dark:divide-dark-700">
      {posts.map(({ slug, date, title, summary }) => {
        return (
          <li key={slug} className="py-6">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-light-500 dark:text-dark-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <SubsectionTitle>
                        <Link
                          href={`/blog/${slug}`}
                          className="text-light-900 dark:text-dark-100"
                        >
                          {title}
                        </Link>
                      </SubsectionTitle>
                    </div>
                    <div className="prose max-w-none text-light-500 dark:text-dark-400">
                      {summary}
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/blog/${slug}`}
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Read "${title}"`}
                    >
                      Read more <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
    {pagination && pagination.totalPages > 1 && (
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    )}
  </>
);

export default PostList;

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`
            }
          >
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  );
};
