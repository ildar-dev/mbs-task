/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'vue'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: null,
      },
    },
    // FSD: ограничения импортов
    {
      files: ['src/features/**/*.ts', 'src/features/**/*.vue'],
      rules: {
        // запрет зависеть от app
        'no-restricted-imports': ['error', {
          patterns: ['@/app/*']
        }],
      },
    },
    {
      files: ['src/**'],
      rules: {
        // запрет deep-import'ов фич (разрешён только публичный API)
        'no-restricted-imports': ['error', {
          patterns: ['@/features/*/*/**']
        }],
      },
    },
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['dist/', 'node_modules/'],
}


