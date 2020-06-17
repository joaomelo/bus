'use strict';
const path = require('path');

const merge = require('webpack-merge');
const common = require('../../webpack.common.js');

const libSrc = path.resolve(__dirname, '../src');
const libDist = path.resolve(__dirname, '../dist');

const libProps = require('../../package.json');
const libName = libProps.name.split('/')[1] || libProps.name;

module.exports = merge(common, {
  mode: 'production',
  entry: [`${libSrc}/index.js`],
  output: {
    path: libDist,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: libName
  }
});
