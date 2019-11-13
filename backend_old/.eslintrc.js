module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'key-spacing': ['error', {
      multiLine: {
        beforeColon: false,
        afterColon: true
      },
    }],
    'keyword-spacing': ['error',
      {
        before: true,
        after: true
      },
    ],
    'comma-spacing': ['error',
      {
        before: false,
        after: true
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    semi: ['error', 'always'],
    quotes: ['error', 'single', {
      avoidEscape: true
    }],
    'quote-props': ['error', 'as-needed'],
    'no-floating-decimal': 'error',
    'require-await': 'error',
    'no-return-await': 'error',
    'array-bracket-spacing': ['error',
      'always',
      {
        singleValue: true,
        objectsInArrays: false,
        arraysInArrays: false
      },
    ],
    'space-infix-ops': ['error', {
      int32Hint: false
    }],
    'block-spacing': ['error', 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};