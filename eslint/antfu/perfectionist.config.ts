import type { Rules } from "@antfu/eslint-config";

const rules: Rules = {
  "perfectionist/sort-enums": ["error", {
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-imports": ["error", {
    groups: [
      ["default-type", "value-type", "named-type", "type"],
      ["default-external", "value-external", "named-external", "external"],
      ["default-internal", "value-internal", "named-internal", "internal"],
      "side-effect",
      "unknown",
    ],
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-jsx-props": ["error", {
    customGroups: [
      { elementNamePattern: "^ref$", groupName: "ref" },
      { elementNamePattern: "^id$", groupName: "id" },
      { elementNamePattern: "^className$", groupName: "className" },
      { elementNamePattern: "^src$", groupName: "src" },
      { elementNamePattern: "^alt$", groupName: "alt" },
      { elementNamePattern: "^on[A-Z].*", groupName: "eventHandler" },
    ],
    groups: ["ref", "id", "className", "src", "alt", "shorthand-prop", "prop", "multiline-prop", "eventHandler"],
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-object-types": ["error", {
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-objects": ["error", {
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-union-types": ["error", {
    order: "asc",
    type: "natural",
  }],

  "perfectionist/sort-variable-declarations": ["error", {
    order: "asc",
    type: "natural",
  }],
};

export { rules };
