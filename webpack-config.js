/* global module:true, __dirname */

const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const buildLocales = require('./build-locales')
const date = new Date()

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

WARNING: You are reading a minimized version of JClic.js. Full source available at:
${pkg.homepage}
`

const conf = {
  entry: './src/JClic.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jclic.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      extractComments: {
        file: 'jclic.components.LICENSE',
        banner: banner
      }
    })
  ]
};

module.exports = conf
