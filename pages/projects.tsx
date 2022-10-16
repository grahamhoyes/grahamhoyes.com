import { ComponentMap } from "mdx-bundler/client";
import { GetStaticProps } from "next";

import { ProjectFrontMatter } from "types/FrontMatter";
import siteMetadata from "@/data/siteMetadata";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { CardContent } from "@/components/Card";
import { formatSlug, getFileBySlug, getFiles } from "@/lib/mdx";

interface ProjectsProps {
  projects: { mdxSource: string; frontMatter: ProjectFrontMatter }[];
}

const projectCardComponents: ComponentMap = {
  p: CardContent,
};

// TODO:
// Webnotes
// Counters
// Hackathon template
// Dotfiles
// Keyboard layout
// Django swarm template

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-light-200 dark:divide-dark-700">
        <div className="space-y-2 pt-2 pb-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projects.map(({ mdxSource, frontMatter }) => (
              <Card
                key={frontMatter.title}
                title={frontMatter.title}
                imgSrc={frontMatter.imgSrc}
                href={frontMatter.href}
              >
                <MDXLayoutRenderer
                  layout="NoLayout"
                  mdxSource={mdxSource}
                  components={projectCardComponents}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const slugs = getFiles("projects");

  const projects = await Promise.all(
    slugs.map(
      async (slug) => await getFileBySlug("projects", formatSlug(slug)),
    ),
  );

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
