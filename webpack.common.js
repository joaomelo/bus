'use strict';
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json']
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
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      allowAsyncCycles: false,
      cwd: process.cwd()
    })
  ]
};
