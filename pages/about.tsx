import { GetStaticProps } from "next";

import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { getFileBySlug } from "@/lib/mdx";
import { AuthorFrontMatter } from "types/FrontMatter";

const DEFAULT_LAYOUT = "AuthorLayout";

interface AboutProps {
  authorDetails: {
    mdxSource: string;
    frontMatter: AuthorFrontMatter;
  };
}

const About = ({ authorDetails }: AboutProps) => {
  const { mdxSource, frontMatter } = authorDetails;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const authorDetails = await getFileBySlug("authors", "default");
  return { props: { authorDetails } };
};

export default About;
