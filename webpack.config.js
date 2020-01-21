'use strict';
const path = require('path');
const dist = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    publicPath: '/',
    path: dist,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
