"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Giscus, { Mapping, InputPosition, Loading } from "@giscus/react";

import siteMetadata from "@/data/siteMetadata";

export const Comments = () => {
  const { resolvedTheme } = useTheme();
  const [loadComments, setLoadComments] = useState(false);

  const { giscusConfig } = siteMetadata.comments;

  return (
    <>
      {loadComments && (
        <div className="pb-2">
          <Giscus
            id="comments"
            repo={giscusConfig.repo as `${string}/${string}`}
            repoId={giscusConfig.repositoryId}
            category={giscusConfig.category}
            categoryId={giscusConfig.categoryId}
            mapping={giscusConfig.mapping as Mapping}
            strict="1"
            reactionsEnabled={giscusConfig.reactionsEnabled ? "1" : "0"}
            emitMetadata={giscusConfig.emitMetadata ? "1" : "0"}
            inputPosition={giscusConfig.inputPosition as InputPosition}
            theme={
              resolvedTheme === "dark"
                ? giscusConfig.darkTheme
                : giscusConfig.lightTheme
            }
            lang={giscusConfig.lang}
            loading={giscusConfig.loading as Loading}
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
