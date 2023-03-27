const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./app/**/*.(js|tsx|mdx)",
    "./pages/**/*.(js|tsx)",
    "./components/**/*.(js|tsx)",
    "./layouts/**/*.(js|tsx)",
    "./lib/**/*.(js|tsx)",
    "./data/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.sky,
        // Secondary color scheme for dark mode
        dark: colors.zinc,
        // Secondary color scheme for light mode
        light: colors.neutral,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.light.700"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")} !important`,
              },
              code: { color: theme("colors.primary.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.light.900"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.light.900"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.light.900"),
            },
            "h4,h5,h6": {
              color: theme("colors.light.900"),
            },
            pre: {
              backgroundColor: theme("colors.light.800"),
            },
            code: {
              color: theme("colors.pink.500"),
              backgroundColor: theme("colors.light.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            details: {
              backgroundColor: theme("colors.light.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            hr: { borderColor: theme("colors.light.200") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.light.500"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.light.500"),
            },
            strong: { color: theme("colors.light.600") },
            blockquote: {
              color: theme("colors.light.900"),
              borderLeftColor: theme("colors.light.200"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.dark.300"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")} !important`,
              },
              code: { color: theme("colors.primary.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.dark.100"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.dark.100"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.dark.100"),
            },
            "h4,h5,h6": {
              color: theme("colors.dark.100"),
            },
            pre: {
              backgroundColor: theme("colors.dark.800"),
            },
            code: {
              backgroundColor: theme("colors.dark.800"),
            },
            details: {
              backgroundColor: theme("colors.dark.800"),
            },
            hr: { borderColor: theme("colors.dark.700") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.dark.400"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.dark.400"),
            },
            strong: { color: theme("colors.dark.100") },
            thead: {
              th: {
                color: theme("colors.dark.100"),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.dark.700"),
              },
            },
            blockquote: {
              color: theme("colors.dark.100"),
              borderLeftColor: theme("colors.dark.700"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
