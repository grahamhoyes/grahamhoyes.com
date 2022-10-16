import { GetStaticProps } from "next";

import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/utils/kebabCase";

interface TagsProps {
  tags: Record<string, number>;
}

const Tags = ({ tags }: TagsProps) => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSEO
        title={`Tags - ${siteMetadata.author}`}
        description="Things I blog about"
      />
      <div className="flex flex-col items-start justify-start divide-y divide-light-200 dark:divide-dark-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-light-600 dark:text-dark-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const tags = await getAllTags();

  return { props: { tags } };
};

export default Tags;
