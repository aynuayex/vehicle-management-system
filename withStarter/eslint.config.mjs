import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

export default [
  // Specify files or directories to ignore
  {
    ignores: [
      "dist",          // Ignored build output
      ".eslintrc.js",  // Legacy config file
      ".prettierrc.js",// Prettier config
      "coverage",      // Coverage reports
      "build",         // Build output
      "node_modules",  // Dependencies
    ],
  },
  // Base JavaScript configuration
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: "@typescript-eslint/parser",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsConfigs,
    },
    rules: {
      ...tsConfigs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error", // TypeScript-specific rule
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "error", // JavaScript-specific rule
    },
  },
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/*.test.jsx", "**/*.test.tsx"],
    languageOptions: {
      globals: {
        ...globals.jest, // Jest globals for test files
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "no-console": "off", // Allow console logs in tests
    },
  },
  {
    files: ["**/*"],
    plugins: {
      prettier,
    },
    rules: {
      ...prettier.rules, // Prettier rules for code formatting
    },
  },
];
