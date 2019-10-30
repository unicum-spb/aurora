module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [ '@', './src' ],
        ],
        extensions: [ '.ts', '.d.ts', '.tsx', '.vue', '.js', '.jsx', '.json' ],
      },
    },
  },
  extends: [
    'airbnb-base',
    '@vue/airbnb',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'key-spacing': [
      'error',
      {
        multiLine: {
          beforeColon: false,
          afterColon: true
        },
      }
    ],
    'arrow-parens': 'off',
    'keyword-spacing': [
      'error',
      { before: true, after: true },
    ],
    'comma-spacing': [
      'error',
      { before: false, after: true }
    ],
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'lines-between-class-members': [
      'off'
    ],
    'object-curly-newline': [
      'error',
      { consistent: true }
    ],
    semi: [
      'error',
      'always'
    ],
    quotes: [
      'error',
      'single',
      { avoidEscape: true }
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    'no-floating-decimal': 'error',
    'require-await': 'error',
    'no-return-await': 'error',
    'class-methods-use-this': 'off',
    'arrow-spacing': [
      'error',
      { before: true, after: true }
    ],
    'array-bracket-spacing': [ 'error',
      'always',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false
      },
    ],
    'space-infix-ops': [
      'error',
      { int32Hint: false }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'block-spacing': [
      'error',
      'always'
    ],
    'prefer-default-export': ['off'],
    'no-return-assign': ['off'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
