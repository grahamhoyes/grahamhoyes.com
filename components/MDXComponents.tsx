/* eslint-disable react/display-name */
import { useMemo, ComponentType } from "react";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
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
  layout: string;
  mdxSource: string;
  components?: ComponentMap;
  [key: string]: unknown;
}

/**
 * MDX Layout render
 *
 * @param layout Layout in the `layouts/` folder in which to wrap the content.
 *               Use "NoLayout" to return the content as-is.
 * @param mdxSource MDX source
 * @param components Additional component overrides for customizing rendered output
 * @param ...rest Any other props the layout requires
 * @constructor
 */
export const MDXLayoutRenderer = ({
  layout,
  mdxSource,
  components,
  ...rest
}: MDXLayoutProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return (
    <MDXLayout
      layout={layout}
      components={{ ...MDXComponents, ...components }}
      {...rest}
    />
  );
};
