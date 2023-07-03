import { Metadata } from "next";

import { allProjects, Project } from "contentlayer/generated";
import Card from "@/components/Card";
import { MdxRenderer } from "@/components/MdxComponents";

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
      <MdxRenderer content={project} />
    </Card>
  );
};

const Projects = () => {
  return (
    <div className="divide-y divide-light-200 dark:divide-dark-700">
      <div className="space-y-2 pt-2 pb-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Projects
        </h1>
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
