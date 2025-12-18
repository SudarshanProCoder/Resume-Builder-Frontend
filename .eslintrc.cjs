module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme'], location: 'anywhere' }
    ],
    'spaced-comment': ['error', 'never'],

    'no-inline-comments': 'error',
    'no-multi-str': 'off',

    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
