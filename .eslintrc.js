module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    // '@typescript-eslint/no-parameter-properties': ['off'],
    // 'no-param-reassign': ['off'],
    // 'import/first': ['off'],
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
