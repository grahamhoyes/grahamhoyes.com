import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allAuthors } from "contentlayer/generated";

import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";

export const metadata: Metadata = {
  title: "About - Graham Hoyes",
  description: "About me - Graham Hoyes",
};

const About = () => {
  const author = allAuthors.find((author) => author.slug === "default")!;

  const Content = useMDXComponent(author.body.code);

  return (
    <div className="divide-y">
      <div className="space-y-2 pt-2 pb-2 md:space-y-5">
        <h1 className="text-3xl font-bold leading-9 tracking-tight text-light-900 dark:text-dark-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          About
        </h1>
      </div>
      <div className="items-start space-y-2 py-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center">
          <Image
            src={author.avatar}
            alt="avatar"
            width="192"
            height="192"
            className="h-48 w-48 rounded-full"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
            {author.name}
          </h3>
          <div className="text-light-500 dark:text-dark-400">
            {author.occupation}
          </div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${author.email}`} />
            <SocialIcon kind="github" href={author.github} />
            <SocialIcon kind="linkedin" href={author.linkedin} />
          </div>
        </div>
        <div className="prose max-w-none dark:prose-dark xl:col-span-2">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default About;
