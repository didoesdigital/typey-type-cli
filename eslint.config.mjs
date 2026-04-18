// @ts-check

import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const jsConfig = defineConfig({
  files: ["src/**/*.{mjs,js,ts}", "eslint.config.mjs"],
  extends: [js.configs.recommended],
  rules: {
    "no-extra-boolean-cast": "warn",
    "eqeqeq": "warn",

    // eslint v9 new eslint:recommended rules:
    "no-constant-binary-expression": "off",
    "no-empty-static-block": "off",
    "no-new-native-nonconstructor": "off",
    "no-unused-private-class-members": "off",
  },
});

const tsConfig = defineConfig({
  files: ["src/**/*.ts"],
  extends: [tseslint.configs.strictTypeChecked],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    // We use this instead of tsconfig.json noUnusedLocals:
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    // Note: you must disable the base rule as it can report incorrect errors
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",

    // Turn off slow recommended type checked rule (maybe toggle it on occasionally):
    "@typescript-eslint/no-misused-promises": "off",

    // Disable tseslint.configs.strictTypeChecked rules with lots of errors until we can (and if we want to) gradually address them:
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-deprecated": "off",
    "@typescript-eslint/no-misused-spread": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-template-expression": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-conversion": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",

    // Some rules from the tseslint.configs.stylisticTypeChecked set:
    "@typescript-eslint/no-inferrable-types": "warn",
    // Some rules from the tseslint.configs.stylisticTypeChecked set that I might turn on in the future:
    // "@typescript-eslint/consistent-indexed-object-style": "warn",
    // "@typescript-eslint/prefer-for-of": "warn",
    // "@typescript-eslint/prefer-includes": "warn"
    // "@typescript-eslint/prefer-nullish-coalescing": "warn"
    // "@typescript-eslint/prefer-optional-chain": "warn"
  },
});

export default defineConfig([
  globalIgnores([
    // <https://eslint.org/docs/latest/use/configure/ignore#ignoring-files>
    // ["**/node_modules/", ".git/"] are ignored by default

    // Ignore all dot files:
    "**/.*",
    // … and allow specific dot files:
    "!**/.prettierrc.json",
    // Ignore deps files:
    "**/yarn.lock",
    // Ignore build output folders:
    "**/build/",
    // Ignore log files:
    "**/*.log",
    // Ignore top-level folders:
    "bin/",
    "coverage/",
    "didoesdigital/",
    "faux-typey-type-data/dictionaries/",
    "faux-typey-type-data/dictionary-intermediate-data/",
    "faux-typey-type-data/didoesdigital/",
    "faux-typey-type-data/lessons/",
    "faux-typey-type-data/lesson-intermediate-data/",
    "tmp/",
    "typey-type-data/",
    "vendor/",
    // Ignore top-level files:
    "tags",
    "tsconfig.tsbuildinfo",
  ]),
  jsConfig,
  tsConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
          // We lint the whole project according to the default 'tsconfig.json' instead of the build config that excludes test files for compilation:
          // defaultProject: "tsconfig.build.json",
        },
      },
    },
  },
]);
