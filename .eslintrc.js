/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2019',
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['sonarjs', 'filenames', 'fp'],

  settings: {},

  globals: {},

  rules: {
    eqeqeq: 'error',
    'no-var': 'error',
    'arrow-body-style': 'error',
    curly: 'error',
    complexity: ['error', { max: 6 }],
    'sonarjs/cognitive-complexity': ['error', 6],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'max-lines-per-function': [
      'error',
      { max: 100, skipBlankLines: true, skipComments: true },
    ],
    'require-atomic-updates': 1,
    'filenames/match-regex': ['error', '^[a-zA-Z]+(.test|.mock|.config)?$'],
    'filenames/match-exported': 'error',
    'fp/no-let': 'error',
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'max-lines-per-function': [
          'error',
          { max: 200, skipBlankLines: true, skipComments: true },
        ],
      },
    },
    {
      files: ['knex/*/*.js'],
      rules: {
        'filenames/match-regex': ['error', '^[a-zA-Z0-9_]+$'],
      },
    },
    {
      files: ['src/**/__tests__/*.js'],
      rules: {
        'fp/no-let': ['off'],
      },
    },
  ],
};
