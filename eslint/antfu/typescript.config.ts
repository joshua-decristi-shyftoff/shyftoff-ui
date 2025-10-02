import type { OptionsConfig } from "@antfu/eslint-config";

const config: OptionsConfig["typescript"] = {
  overridesTypeAware: {
    "node/prefer-global/process": "off",
    "prefer-const": "error",
    "ts/adjacent-overload-signatures": "off",
    "ts/array-type": ["error", { default: "array-simple", readonly: "array-simple" }],
    "ts/consistent-indexed-object-style": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "ts/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: false }],
    "ts/consistent-type-imports": ["error", { fixStyle: "separate-type-imports", prefer: "type-imports" }],
    "ts/method-signature-style": ["error", "method"],
    "ts/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
    "ts/no-explicit-any": "error",
    "ts/no-magic-numbers": ["error", { ignoreEnums: true, ignoreTypeIndexes: true }],
    "ts/no-meaningless-void-operator": ["error", { checkNever: true }],
    "ts/no-namespace": "error",
    "ts/no-non-null-assertion": "error",
    "ts/prefer-destructuring": "error",
    "ts/strict-boolean-expressions": "off",
    "ts/unbound-method": "off",
    "ts/unified-signatures": ["error", { ignoreDifferentlyNamedParameters: true }],
  },
  tsconfigPath: "tsconfig.json",
};

export default config;
