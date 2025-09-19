import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default defineConfig([
	{ files: ["**/*.js"], languageOptions: { globals: globals.node } },
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]);