module.exports = {
  extends: ['fpkg', 'fpkg/typescript', 'fpkg/vue3', './.eslintrc-auto-import.json'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',
    },
  },
};
