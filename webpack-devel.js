/* global module:true */

const path = require('path');
const buildLocales = require('./build-locales');
const WebpackBar = require('webpackbar');
const dist = path.resolve('dist');

console.log('Building development bundle...');

buildLocales();
// Full devlopment version without polyfills and not 'babelized'
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
  plugins: [
    new WebpackBar()
  ]
};
