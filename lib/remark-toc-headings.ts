import { Parent } from "unist";
import { visit } from "unist-util-visit";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";
import { TocHeading } from "types/Toc";

const remarkTocHeadings = (options: { exportRef: TocHeading[] }) => {
  return (tree: Parent) =>
    visit(tree, "heading", (node: Parent & { depth: number }) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: "#" + slug(textContent),
        depth: node.depth,
      });
    });
};

export default remarkTocHeadings;
