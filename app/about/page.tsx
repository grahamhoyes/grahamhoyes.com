import { Metadata } from "next";
import { allAuthors } from "contentlayer/generated";

import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import Page from "@/components/Page";
import SubsectionTitle from "@/components/SubsectionTitle";
import { MdxRenderer } from "@/components/Mdx";

export const metadata: Metadata = {
  title: "About - Graham Hoyes",
  description: "About me - Graham Hoyes",
};

const About = () => {
  const author = allAuthors.find((author) => author.slug === "default")!;

  return (
    <Page title="About">
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center">
          <Image
            src={author.avatar}
            alt="avatar"
            width="192"
            height="192"
            className="h-48 w-48 rounded-full"
          />
          <SubsectionTitle>{author.name}</SubsectionTitle>
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
          <MdxRenderer code={author.body.code} />
        </div>
      </div>
    </Page>
  );
};

export default About;
