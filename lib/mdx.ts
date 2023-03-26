import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

// Recma packages
import recmaSection from "@frontline-hq/recma-sections";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import remarkExtractFrontmatter from "./remark-extract-frontmatter";
import remarkCodeTitles from "./remark-code-title";
import remarkTocHeadings from "./remark-toc-headings";
import remarkImgToJsx from "./remark-img-to-jsx";

// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

// Local packages
import getAllFilesRecursively from "./utils/files";
import {
  AuthorFrontMatter,
  PostFrontMatter,
  ProjectFrontMatter,
} from "types/FrontMatter";
import { TocHeading } from "types/Toc";

type FrontMatter<T> = T extends "blog"
  ? PostFrontMatter
  : T extends "authors"
  ? AuthorFrontMatter
  : T extends "projects"
  ? ProjectFrontMatter
  : never;

const root = process.cwd();

/**
 * Get the path of all files within a folder in the `data` directory
 *
 * @param folder folder to search
 *
 * @returns array of paths relative to `folder`, excluding `folder` itself
 *          in the paths
 */
export const getFiles = (folder: "blog" | "authors" | "projects") => {
  const prefixPaths = path.join(root, "data", folder);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/"),
  );
};

export const formatSlug = (slug: string) => {
  return slug.replace(/\.(mdx|md)/, "");
};

export const dateSortDesc = (a: string, b: string) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

/**
 * Using @frontline-hq/recma-sections, a single mdx file can be split into
 * multiple exported components. Components are started by
 *
 *    {/* section:<section_name> <*>/}
 *
 * comments (ignore the last set of <>). Along with the default export on
 * the bundled component, there will also be an export called `section_name`,
 * which itself will have a `default` export (along with any other named exports
 * in that section).
 *
 * Imports must occur before any sections, and apply to all sections.
 */
const getSectionFromComment = (comment: string | undefined) => {
  if (!comment || !comment.trim().startsWith("section:")) return undefined;

  return comment.replace(/^\s*section:/, "");
};

/**
 * Bundle and build JSX from the provided MDX source code.
 *
 * Includes a number of remark, rehype, and recma plugins.
 */
export const bundleMdxWrapper = async (source: string) => {
  const toc: TocHeading[] = [];

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, "components"),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, "data") }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      options.recmaPlugins = [
        [recmaSection, { getComment: getSectionFromComment }],
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
      };
      return options;
    },
  });

  return { code, toc, frontmatter };
};

export const getFileBySlug = async <T extends "blog" | "authors" | "projects">(
  folder: T,
  slug: string,
) => {
  const mdxPath = path.join(root, "data", folder, `${slug}.mdx`);
  const mdPath = path.join(root, "data", folder, `${slug}.md`);

  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "esbuild.exe",
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild",
    );
  }

  const { code, toc, frontmatter } = await bundleMdxWrapper(source);

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      ...(frontmatter as FrontMatter<T>),
    },
  };
};

const isBlog = (
  folder: string,
  frontMatter: unknown | unknown[],
): frontMatter is PostFrontMatter => folder === "blog";

/**
 * Get all front matter for files in the specified data folder
 *
 * If `folder` is "blog", front matters will be sorted by date descending
 */
export const getAllFilesFrontMatter = <
  T extends "blog" | "authors" | "projects",
>(
  folder: T,
): FrontMatter<T>[] => {
  const prefixPaths = path.join(root, "data", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: FrontMatter<T>[] = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");

    // Remove unexpected file
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }

    // Remove hidden files
    if (fileName.startsWith(".")) {
      return;
    }

    const source = fs.readFileSync(file, "utf8");
    const matterFile = matter(source);

    const frontmatter = matterFile.data as FrontMatter<T>;

    if ("draft" in frontmatter && frontmatter.draft === true) {
      // Skip over drafts
      return;
    }

    if (isBlog(folder, frontmatter)) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      });
    } else {
      // Authors and projects
      allFrontMatter.push({
        ...frontmatter,
      });
    }
  });

  if (folder === "blog") {
    // TODO: Figure out how to make typescript realize this is a PostFrontMatter
    // @ts-ignore
    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
  } else {
    return allFrontMatter;
  }
};
