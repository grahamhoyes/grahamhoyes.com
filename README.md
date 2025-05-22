# Graham's Website

This is my personal website, blog, and collection of whatever else I want to put on the internet.

It is primarily built with Typescript, NextJS, Tailwind CSS, and Contentlayer. The code is very heavily adapted from an old version of the [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog/) template.

## Deployment

The site is configured to use a static export with `next build` - run `npm run build`, and get static HTML in the `out` directory. Image optimization is currently disabled, but that can be re-enabled if we switch to using `next serve` instead.

The site is currently deployed to Cloudflare Pages following [these instructions](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/).
