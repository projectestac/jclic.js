/* global module:true */

const path = require('path');
const buildLocales = require('./build-locales');
const dist = path.resolve('dist');

console.log('Building the development bundle for ES2015...');

buildLocales();

// Full bundle transpiled to ES5 with Babel
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/JClic.js'],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      }
    ]
  },
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: dist,
    filename: 'jclic.js',
  },
};
