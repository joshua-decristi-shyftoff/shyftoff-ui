import type { Rules, TypedFlatConfigItem } from "@antfu/eslint-config";

const rules: Rules = {
  "unicorn/filename-case": ["error", {
    cases: {
      kebabCase: true,
    },
  }],
};

const files: TypedFlatConfigItem[] = [
  {
    // Enforce PascalCase for TSX components
    files: ["**/*.{ts,tsx}"],
    rules: {
      "unicorn/filename-case": ["error", {
        cases: { pascalCase: true },
      }],
    },
  },
  {
    // Disable PascalCase for TSX components
    files: [
      "**/*.config.ts",
      "app/**/{layout,page,loading,not-found,error,global-error,route,template,default}.tsx",
    ],
    rules: {
      "unicorn/filename-case": ["error", {
        cases: { camelCase: true },
      }],
    },
  },
  {
    // Disable filename case rule for markdown files
    files: ["**/*.md"],
    rules: { "unicorn/filename-case": "off" },
  },
];

export { files, rules };
