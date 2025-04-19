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
      <MdxRenderer code={project.body.code} />
    </Card>
  );
};

const Projects = () => {
  return (
    <Page title="Projects">
      <div className="-m-4 flex flex-wrap">
        {allProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </Page>
  );
};

export default Projects;
