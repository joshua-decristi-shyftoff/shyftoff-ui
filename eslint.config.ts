import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import { defineConfig } from "eslint/config";

import antfuEslintConfig from "./eslint/antfu";
import importsConfig from "./eslint/imports.config";

const config = defineConfig([
  ...(antfuEslintConfig as unknown as TypedFlatConfigItem[]),
  ...importsConfig,
]);

export default config;
