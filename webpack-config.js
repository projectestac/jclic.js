/* global module:true, __dirname */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const pkg = require('./package.json')
const buildLocales = require('./build-locales')
const date = new Date()
const dist = path.resolve(__dirname, 'dist')

const commonSettings = {
  devtool: 'source-map',
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  }
}

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

// Full bundle with the original ES6 code
const es6 = Object.assign(commonSettings, {
  mode: 'development',
  entry: './src/JClic.js',
  output: {
    path: dist,
    filename: 'jclic_es6.js',
  },
})

// Full bundle transpiled to ES5 with Babel
const es5 = Object.assign(commonSettings, {
  mode: 'development',
  entry: ['babel-polyfill', './src/JClic.js'],
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
  output: {
    path: dist,
    filename: 'jclic.js'
  },
})

// Minified ES5 bundle
const es5mini = Object.assign(commonSettings, {
  mode: 'production',
  entry: ['babel-polyfill', './src/JClic.js'],
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
  output: {
    path: dist,
    filename: 'jclic.min.js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      sourceMap: true,
      extractComments: {
        condition: /\/\*\!/,
        filename: 'jclic.components.LICENSE',
        banner: banner
      }
    })],
  },
})

//module.exports = [/*es6, es5 , es5mini*/ es6]

module.exports = es6
