module.exports = {
  /* 为了覆盖@typescript-eslint/no-unused-vars规则，fpkg/vue3要确保写到fpkg/typescript之后 */
  extends: ['../../.eslintrc.js', 'fpkg/typescript', 'fpkg/vue3', './.eslintrc-auto-import.json'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',
    },
  },
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
  rules: {
    /** FIXME: @typescript-eslint/prefer-function-type 这个规则使 vscode-eslint 插件不能正常运行，暂时先关闭 */
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 0,
    'vue/no-duplicate-attributes': 0,
    'vue/no-empty-component-block': 0,
    'no-param-reassign': 0,
    'max-len': ['error', { code: 150, ignoreUrls: true }],
    'max-params': ['error', 4],
    'vue/block-order': [
      'error',
      {
        order: ['route', 'script', 'template', 'style'],
      },
    ],
  },
};
