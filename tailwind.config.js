const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./app/**/*.(js|tsx|mdx)",
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
        mono: ["var(--font-source-code-pro)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: colors.sky,
        // Secondary color scheme for dark mode
        dark: colors.zinc,
        // Secondary color scheme for light mode
        light: colors.neutral,
      },
      // Standard heading styles for consistency across the site
      heading: {
        h1: "text-4xl font-extrabold leading-tight tracking-tight text-light-900 dark:text-dark-100",
        h2: "text-3xl font-bold leading-tight tracking-tight text-light-900 dark:text-dark-100",
        h3: "text-2xl font-semibold leading-tight text-light-900 dark:text-dark-100",
        h4: "text-xl font-semibold leading-tight text-light-900 dark:text-dark-100",
        h5: "text-lg font-semibold leading-tight text-light-900 dark:text-dark-100",
        h6: "text-base font-semibold leading-tight text-light-900 dark:text-dark-100",
        meta: "text-sm text-light-600 dark:text-dark-400",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.light.900"),
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
              fontSize: theme("fontSize.2xl")[0],
              lineHeight: theme("lineHeight.tight"),
              "&:not(:first-child)": {
                marginTop: "1.5em",
              },
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.light.900"),
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("lineHeight.tight"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.light.900"),
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("lineHeight.tight"),
            },
            "h4,h5,h6": {
              color: theme("colors.light.900"),
            },
            pre: {
              backgroundColor: theme("colors.light.800"),
            },
            code: {
              color: theme("colors.blue.600"),
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
            color: theme("colors.dark.50"),
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
              fontSize: theme("fontSize.2xl")[0],
              lineHeight: theme("lineHeight.tight"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.dark.100"),
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("lineHeight.tight"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.dark.100"),
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("lineHeight.tight"),
            },
            "h4,h5,h6": {
              color: theme("colors.dark.100"),
            },
            pre: {
              backgroundColor: theme("colors.dark.800"),
            },
            code: {
              color: theme("colors.blue.200"),
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
