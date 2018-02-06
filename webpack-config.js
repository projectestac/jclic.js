/* global module:true, __dirname */

const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const buildLocales = require('./build-locales')
const date = new Date()
const dist = path.resolve(__dirname, 'dist')

buildLocales()

console.log('Launching WebPack...')

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

WARNING: This is a compressed, uglyfied version of JClic.js. Full source code is freely available at:
${pkg.homepage}
`

const conf = {
  entry: ['babel-polyfill', './src/JClic.js'],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true,
          failOnWarning: true
        }
      },
    ],
  },
  output: {
    path: dist,
    filename: 'jclic.js'
  },
  plugins: []
}

const confMini = {
  entry: ['babel-polyfill', './src/JClic.js'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  output: {
    path: dist,
    filename: 'jclic.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      extractComments: {
        filename: 'jclic.components.LICENSE',
        banner: banner
      }
    })
  ]
}

module.exports = [conf, confMini]
