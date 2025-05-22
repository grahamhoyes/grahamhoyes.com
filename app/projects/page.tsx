import { Metadata } from "next";

import { allProjects, Project } from "contentlayer/generated";
import Card from "@/components/Card";
import { MdxRenderer } from "@/components/Mdx";
import Page from "@/components/Page";

export const metadata: Metadata = {
  title: "Projects - Graham Hoyes",
};

const ProjectCard = (project: Project) => {
  return (
    <Card
      key={project.title}
      title={project.title}
      imgSrc={project.imgSrc}
      imageAnchor={project.imageAnchor}
      href={project.href}
      linkText={project.linkText}
    >
      <div className="prose text-gray-600 dark:prose-dark dark:text-gray-300">
        <MdxRenderer code={project.body.code} />
      </div>
    </Card>
  );
};

const Projects = () => {
  return (
    <Page title="Projects">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </Page>
  );
};

export default Projects;
