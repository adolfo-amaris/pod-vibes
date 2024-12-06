import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    // Configuración global
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['jest.setup.js', 'commitlint.config.js', 'eslint.config.js'], // Indica los archivos o patrones que quieras ignorar
    languageOptions: {
      globals: {
        browser: true,
        es2021: true,
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-console': 'off',
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    // Configuración para jest.setup.js (sin TypeScript parser)
    files: ['jest.setup.js'],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
    rules: {
      // Puedes ajustar reglas específicas aquí si es necesario
    },
  },
  {
    // Configuración específica para archivos de prueba
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        jest: true, // Habilita las funciones globales de Jest
        test: true,
        expect: true,
        it: true,
        describe: true,
        beforeEach: true,
        global: true,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Reglas recomendadas de Jest
    },
  },
  {
    // Configuración para Prettier
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...prettier.rules,
    },
  },
];
