"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export const Comments = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="grahamhoyes/grahamhoyes.com"
      repoId="R_kgDOHOZmRQ"
      category="Announcements"
      categoryId="DIC_kwDOHOZmRc4Cqf5a"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
