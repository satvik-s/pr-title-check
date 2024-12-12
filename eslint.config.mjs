import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/dist/',
            '**/lib/',
            '**/node_modules/',
            '**/jest.config.js',
            '**/*.js',
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:eslint-comments/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:node/recommended',
            'plugin:prettier/recommended',
            'prettier',
        ),
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            import: fixupPluginRules(_import),
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: 'script',

            parserOptions: {
                project: 'tsconfig.json',
            },
        },

        rules: {
            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'array-simple',
                },
            ],

            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-ignore': 'allow-with-description',
                },
            ],

            '@typescript-eslint/no-floating-promises': 'error',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-default-export': 'error',
            'import/no-duplicates': 'error',
            'import/no-unresolved': 'off',
            'node/no-missing-import': 'off',
            'node/no-unsupported-features/es-syntax': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
];
