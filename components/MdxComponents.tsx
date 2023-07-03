"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "mdx/types";
import Image from "./Image";
import CustomLink from "./Link";
import TOCInline from "./TOCInline";
import Pre from "./Pre";

// Default component overrides
export const defaultMdxComponents: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
};

interface MDXRendererProps {
  // Contentlayer generated content
  content: {
    body: {
      code: string;
    };
  };
  // Additional component overrides for customizing rendered output
  components?: MDXComponents;
  // Any other props the layout requires
  [key: string]: unknown;
}

/**
 * MDX render
 *
 * Given the MDX source as bundled javascript, get a memoized component
 */
export const MdxRenderer = ({
  content,
  components,
  ...rest
}: MDXRendererProps) => {
  const Component = useMDXComponent(content.body.code);

  return (
    <Component
      components={{ ...defaultMdxComponents, ...components }}
      {...rest}
    />
  );
};

export default MdxRenderer;
