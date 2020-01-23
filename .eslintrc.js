module.exports = {
  env: {
    'jest/globals': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    semi: ['error', 'always']
  },
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  plugins: ['jest']
};
