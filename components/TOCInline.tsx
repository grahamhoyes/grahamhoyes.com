import { TocItem } from "pliny/mdx-plugins/remark-toc-headings";

interface TOCInlineProps {
  toc: TocItem[];
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  // Exclude titles matching these
  exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = "",
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp("^(" + exclude.join("|") + ")$", "i")
    : new RegExp("^(" + exclude + ")$", "i");

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading &&
      heading.depth <= toHeading &&
      !re.test(heading.value),
  );

  const tocList = (
    <ul>
      {filteredToc.map((heading) => (
        <li
          key={heading.value}
          className={`${heading.depth >= indentDepth && "ml-6"}`}
        >
          <a href={heading.url}>{heading.value}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {asDisclosure ? (
        <details open>
          <summary className="ml-6 pt-2 pb-2 text-xl font-bold">
            Table of Contents
          </summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  );
};

export default TOCInline;
