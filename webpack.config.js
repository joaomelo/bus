'use strict';
const path = require('path');
const dist = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['./src/index.js'],
  output: {
    path: dist,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'bus'
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
