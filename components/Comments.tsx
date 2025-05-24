"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export const Comments = () => {
  const { resolvedTheme } = useTheme();
  const [loadComments, setLoadComments] = useState(true);

  return (
    <>
      {loadComments && (
        <div className="pb-2">
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
        </div>
      )}

      <button
        className="text-center rounded-lg  text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        onClick={() => setLoadComments(!loadComments)}
      >
        {loadComments ? "Hide Comments" : "Show Comments"}
      </button>
    </>
  );
};

export default Comments;
