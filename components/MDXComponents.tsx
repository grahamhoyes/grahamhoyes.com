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
  // To render a section of an MDX file created by recma-sections,
  // supply a sectionName. Default is "default" to use the default export
  // (regular MDX content).
  sectionName?: string;
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
  sectionName = "default",
  components,
  ...rest
}: MDXLayoutProps) => {
  const mdxExport = useMemo(() => {
    return getMDXExport(mdxSource);
  }, [mdxSource]);

  const MDXComponent = useMemo(() => {
    let component = mdxExport[sectionName];

    if (typeof component === "object" && "default" in component) {
      component = component.default;
    }

    return component;
  }, [sectionName, mdxExport]);

  return (
    <MDXComponent
      layout={layout}
      components={{ ...MDXComponents, ...components }}
      {...rest}
    />
  );
};
