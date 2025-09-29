import { antfu } from "@antfu/eslint-config";

import * as perfectionistConfig from "./perfectionist.config";
import reactConfig from "./react.config";
import stylisticConfig from "./stylistic.config";
import typescriptConfig from "./typescript.config";
import * as unicornConfig from "./unicorn.config";

const config = antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: "prettier",

    },
    // Imports to be handled by eslint-plugin-import
    imports: false,
    nextjs: true,
    react: reactConfig,
    stylistic: stylisticConfig,
    typescript: typescriptConfig,
  },
  {
    rules: {
      "antfu/top-level-function": "off",
      ...perfectionistConfig.rules,
      ...unicornConfig.rules,
    },
  },
  ...unicornConfig.files,
)
  .renamePlugins({
    import: "import-lite",
  });

export default config;
