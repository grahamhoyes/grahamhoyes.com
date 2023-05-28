import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from "contentlayer/source-files";
import path from "path";
import readingTime from "reading-time";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkExtractFrontmatter from "./lib/remark-extract-frontmatter";
import remarkCodeTitles from "./lib/remark-code-title";
import remarkImgToJsx from "./lib/remark-img-to-jsx";

// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  // TODO: toc
};

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.(md|mdx)",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
  },
  computedFields,
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/*.md",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    imgSrc: { type: "string", required: true },
    href: { type: "string", required: true },
    linkText: { type: "string", required: true },
    imageAnchor: { type: "string" },
    order: { type: "number" },
  },
  computedFields,
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "authors/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string", required: true },
    occupation: { type: "string", required: true },
    email: { type: "string", required: true },
    linkedin: { type: "string", required: true },
    github: { type: "string", required: true },
  },
  computedFields,
}));

const root = process.cwd();

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Project, Author],
  mdx: {
    cwd: root,
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});
