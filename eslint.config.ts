import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig
(
	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],

	{
		languageOptions:
		{
			ecmaVersion: "latest",
			sourceType: "module",
			globals: globals.browser
		},
		rules:
		{
			"vue/multi-word-component-names": "off",
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-inferrable-types": 0,
			"brace-style": ["error", "allman"],
			"curly": ["error", "all"],
			"no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
			"no-unexpected-multiline": "off"
		}
	},

	{
		files: ["src/**/*.{ts,tsx,vue}"],
		rules:
		{
			"@typescript-eslint/typedef": ["error", { variableDeclaration: true }]
		}
	},

	// Key part for <script setup lang="ts">:
	{
		files: ["*.vue", "**/*.vue"],
		languageOptions:
		{
			parserOptions:
			{
				parser: "@typescript-eslint/parser"
			}
		},
		rules:
		{
			"vue/html-indent": ["error", "tab"],
			"vue/script-indent": ["error", "tab", { baseIndent: 1 }]
		}
	},

	{
		files: ["**/*.json"],
		plugins: { json },
		language: "json/json",
		extends: ["json/recommended"]
	},
);

