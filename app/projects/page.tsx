import { Metadata } from "next";

import { allProjects, Project } from "contentlayer/generated";
import Card from "@/components/Card";
import { MdxRenderer } from "@/components/Mdx";
import PageTitle from "@/components/PageTitle";

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
      <MdxRenderer code={project.body.code} />
    </Card>
  );
};

const Projects = () => {
  return (
    <div className="divide-y divide-light-200 dark:divide-dark-700">
      <div className="space-y-2 pt-2 pb-2 md:space-y-5">
        <PageTitle>Projects</PageTitle>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {allProjects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
