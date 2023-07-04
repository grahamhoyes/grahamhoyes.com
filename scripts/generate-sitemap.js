const fs = require("fs");
const globby = require("globby");
const matter = require("gray-matter");
const prettier = require("prettier");
const siteMetadata = require("../data/siteMetadata");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "app/*.js",
    "app/*.tsx",
    "data/blog/**/*.mdx",
    "data/blog/**/*.md",
    "public/tags/**/*.xml",
    "!app/_*.js",
    "!app/_*.tsx",
    "!app/api",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search(".md") >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, "utf8");
                  const fm = matter(source);
                  if (fm.data.draft) {
                    return;
                  }
                  if (fm.data.canonicalUrl) {
                    return;
                  }
                }
                const path = page
                  .replace("app/", "/")
                  .replace("data/blog", "/blog")
                  .replace("public/", "/")
                  .replace(".js", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/feed.xml", "");
                const route = path === "/index" ? "" : path;

                if (
                  page.search("app/not-found.") > -1 ||
                  page.search(`app/blog/[...slug].`) > -1
                ) {
                  return;
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
})();
