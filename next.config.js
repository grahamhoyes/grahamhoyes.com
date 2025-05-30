// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withContentlayer } = require("next-contentlayer2");

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`;

// Security headers aren't needed in static export mode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * @type {import('next').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer];

  /**
   * @type {import('next').NextConfig}
   **/
  const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    eslint: {
      dirs: ["pages", "components", "lib", "layouts", "scripts"],
    },
    output: "export",
    images: {
      // Using cloudflare pages, we don't have the nextjs image api
      unoptimized: true,
    },
    // Headers aren't used in static export mode
    // async headers() {
    //   return [
    //     {
    //       source: "/(.*)",
    //       headers: securityHeaders,
    //     },
    //   ];
    // },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };

  return plugins.reduce((cfg, plugin) => plugin(cfg), nextConfig);
};
