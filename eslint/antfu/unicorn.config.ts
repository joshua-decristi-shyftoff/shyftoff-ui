import type { Rules, TypedFlatConfigItem } from "@antfu/eslint-config";

const rules: Rules = {
  "unicorn/better-regex": "error",
  "unicorn/filename-case": ["error", {
    cases: { kebabCase: true },
  }],
};

const files: TypedFlatConfigItem[] = [
  {
    // Enforce PascalCase naming convention for TSX components
    files: ["**/*.{ts,tsx}"],
    rules: {
      "unicorn/filename-case": ["error", {
        cases: { pascalCase: true },
      }],
    },
  },
  {
    // Enforce kebab-case naming convention for config files
    files: ["**/*.config.ts"],
    rules: {
      "unicorn/filename-case": ["error", {
        cases: { kebabCase: true },
      }],
    },
  },
  {
    // Disable naming convention for markdown files
    // Disable naming convention for Nextjs routing files
    files: [
      "**/*.md",
      "app/**/{layout,page,loading,not-found,error,global-error,route,template,default}.tsx",
    ],
    rules: { "unicorn/filename-case": "off" },
  },
];

export { files, rules };
