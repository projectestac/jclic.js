/* global module:true */

// ES6 development bundle without polyfills

const path = require('path');
const buildLocales = require('./build-locales');
const dist = path.resolve('dist');

buildLocales();

module.exports = {
  mode: 'development',
  entry: './src/JClic.js',
  devtool: 'source-map',
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: dist,
    filename: 'jclic-es6.js',
  },
};
