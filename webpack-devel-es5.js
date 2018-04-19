/* global module:true */

const path = require('path');
const buildLocales = require('./build-locales');
const dist = path.resolve('dist');

console.log('Building development bundle for ES5...');

buildLocales();

// Full bundle transpiled to ES5 with Babel
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/JClic.js'],
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
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
