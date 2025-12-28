module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    // React 17+ JSX
    'react/react-in-jsx-scope': 'off',

    // TypeScript pragmatism
    '@typescript-eslint/no-explicit-any': 'off',

    // JSX text noise
    'react/no-unescaped-entities': 'off',

    // Hooks safety
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    // Vite Fast Refresh
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true }
    ],

    /* ============================
     🚫 COMMENT CONTROL (IMPORTANT)
     ============================ */

    // 🚫 Block TODO / FIXME / HACK comments
    'no-warning-comments': [
      'error',
      {
        terms: ['todo', 'fixme', 'hack', 'xxx'],
        location: 'anywhere'
      }
    ],

    // 🚫 Disallow inline comments: `const a = 1; // comment`
    'no-inline-comments': 'error',

    // 🚫 Control block comments
    'spaced-comment': [
      'error',
      'never',
      {
        // ✅ Allow JSDoc comments: /** */
        markers: ['*'],

        // ✅ Allow license headers: /*! */
        exceptions: ['!']
      }
    ]
  },
  ignorePatterns: ['dist', 'node_modules', '*.d.ts']
};
