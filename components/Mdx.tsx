import { useMDXComponent } from "next-contentlayer2/hooks";
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
  // MDX source code as bundled javascript
  code: string;
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
  code,
  components,
  ...rest
}: MDXRendererProps) => {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{ ...defaultMdxComponents, ...components }}
      {...rest}
    />
  );
};

export default MdxRenderer;
