/* eslint-disable react/display-name */
import { useMemo, ComponentType } from "react";
import { ComponentMap, getMDXExport } from "mdx-bundler/client";
import Image from "./Image";
import CustomLink from "./Link";
import TOCInline from "./TOCInline";
import Pre from "./Pre";

const Wrapper: ComponentType<{ layout: string }> = ({
  layout = "NoLayout",
  ...rest
}) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
};

interface MDXLayoutProps {
  // Layout in the `layouts/` folder in which to wrap the content.
  // Use "NoLayout" (the default) to return content as-is.
  layout?: string;
  // MDX source
  mdxSource: string;
  // To render a named export of an MDX file, supply an exportName.
  // Default is "default" to use the default export (regular MDX
  // content).
  exportName?: string;
  // Additional component overrides for customizing rendered output
  components?: ComponentMap;
  // Any other props the layout reuqires
  [key: string]: unknown;
}

/**
 * MDX Layout render
 *
 * Given the MDX source as bundled javascript, get a memoized component
 */
export const MDXLayoutRenderer = ({
  layout = "NoLayout",
  mdxSource,
  exportName = "default",
  components,
  ...rest
}: MDXLayoutProps) => {
  const mdxExport = getMDXExport(mdxSource);

  const MDXComponent = useMemo(
    () => mdxExport[exportName],
    [exportName, mdxExport],
  );

  return (
    <MDXComponent
      layout={layout}
      components={{ ...MDXComponents, ...components }}
      {...rest}
    />
  );
};
