import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [{
	...js.configs.recommended,

	files: ["src/**/*.ts"],
	plugins: {
		"@typescript-eslint": tsPlugin,
	},
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node
		},
		parser: tsParser,
		ecmaVersion: "latest",
		sourceType: "module",
	},

	rules: {
		...js.configs.all.rules,
		...js.configs.recommended.rules,
		...tsPlugin.configs.recommended.rules,
		semi: ["error", "never"],
		curly: ["error", "multi-line", "consistent"],
		"func-style": "off",
		"max-lines-per-function": "off",
		"max-statements": "off",
		"complexity": "off",
		"init-declarations": "off",
		"one-var": ["error", "consecutive"],
		"sort-vars": "off",
		"sort-keys": "off",
		"no-magic-numbers": "off"
	},
}];
