import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

const config = defineConfig([
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    rules: {
      "import/exports-last": "error",
      "import/imports-first": "error",

      // Disable "no-unresolved" because it's covered by typescript
      "import/no-unresolved": "off",

      // Disallow all relative imports
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["./", "../"],
            message: "\n No relative imports allowed, please use absolute imports (@/...) instead",
          },
        ],
      }],
    },
  },
  {
    // Enable "no default export" for js ts (etc) files
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: { "import/no-default-export": "error" },
  },
  {
    // Disable "default export" rule and "disallow all relative import" for config files
    files: ["**/*.config.{js,mjs,cjs,ts}", "./eslint/**/*.ts"],
    rules: {
      "import/no-default-export": "off",
      "no-restricted-imports": "off",
    },
  },
  {
    // Disable "default export" rule for Next.js routing files
    files: ["app/**/{layout,page,loading,not-found,error,global-error,route,template,default}.{ts,tsx}"],
    rules: { "import/no-default-export": "off" },
  },
]);

export default config;
