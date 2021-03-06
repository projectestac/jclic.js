/* global module:true */

// Development bundle for ES5

const path = require('path');
const buildLocales = require('./build-locales');
const dist = path.resolve('dist');

buildLocales();

// Full bundle transpiled to ES5 with Babel
module.exports = {
  mode: 'development',
  entry: ['idempotent-babel-polyfill', './src/JClic.js'],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        //exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
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
