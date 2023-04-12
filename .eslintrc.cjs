module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: 'semistandard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'no-unused-private-class-members': 'error'
  }
};
