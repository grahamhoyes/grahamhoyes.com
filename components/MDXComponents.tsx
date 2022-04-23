/* eslint-disable react/display-name */
import { useMemo, ComponentType } from "react";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import Image from "./Image";
import CustomLink from "./Link";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import { BlogNewsletterForm } from "./NewsletterForm";

const Wrapper: ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: Wrapper,
};

interface MDXLayoutProps {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({
  layout,
  mdxSource,
  ...rest
}: MDXLayoutProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
