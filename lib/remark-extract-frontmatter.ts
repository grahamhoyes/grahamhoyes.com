import { VFile } from "vfile";
import { Parent } from "unist";
import { visit } from "unist-util-visit";
import { load } from "js-yaml";

const extractFrontmatter = () => {
  return (tree: Parent, file: VFile) => {
    visit(tree, "yaml", (node: Parent & { value: string }) => {
      file.data.frontmatter = load(node.value);
    });
  };
};

export default extractFrontmatter;
