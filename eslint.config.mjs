import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Internal links are plain <a> on purpose: each page carries its own
      // stylesheet set (the V20/V22 CSS files share class names), and a full
      // page load is what keeps one page's CSS from leaking into the next.
      "@next/next/no-html-link-for-pages": "off",
      // The approved design is pixel-matched with plain <img> tags.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
