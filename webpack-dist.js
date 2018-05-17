/* global module:true */

// Production bundle compatible with ES5

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');
const buildLocales = require('./build-locales');
const WebpackBar = require('webpackbar');
const date = new Date();
const dist = path.resolve('dist');

buildLocales();

const banner = `
JClic.js version ${pkg.version} (${date.toISOString().substr(0, 10)})
An HTML5 player of JClic activities
${pkg.homepage}
 
(c) 2000-${date.getFullYear()} Catalan Educational Telematic Network (XTEC)

Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
the European Commission- subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/software/page/eupl

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.

For full license information of included components please see: jclic.components.LICENSE

WARNING: This is a compressed version of JClic.js. Full source code is freely available at:
${pkg.homepage}
`;

// Minified ES5 bundle
module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/JClic.js'],
  devtool: 'source-map',
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        extractComments: {
          condition: /^\!/,
          filename: 'jclic.components.LICENSE',
          banner: () => banner,
        },
      })
    ],
  },
  output: {
    path: dist,
    filename: 'jclic.min.js',
  },
  plugins: [
    new WebpackBar()
  ]
};
