import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
    {
        // Configuración global
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
        },
    },
    {
        // Configuración para Prettier
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            ...prettier.rules,
        },
    },
];
