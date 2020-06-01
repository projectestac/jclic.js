/* global module:true __dirname require */

const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const pkg = require('./package.json');
const buildLocales = require('./build-locales');
// const WebpackBar = require('webpackbar');
const date = new Date();
const dist = path.resolve(__dirname, 'dist');

buildLocales();

const banner = `
${pkg.title} version ${pkg.version} (${date.toISOString().substr(0, 10)})
${pkg.description}
${pkg.homepage}
 
(c) 2000-${date.getFullYear()} ${pkg.author.name || pkg.author}

Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
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

WARNING: This is a compressed version of ${pkg.title}. Full source code is freely available at:
${pkg.homepage}
`;

/**
 * Bundle used in HTML browsers
 */
const mainConfig = {
  // entry: ['idempotent-babel-polyfill', './src/JClic.js'],
  entry: './src/JClic.js',
  devtool: 'source-map',
  output: {
    path: dist,
    filename: 'jclic.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
      },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'test'),
    watchContentBase: true,
    compress: true,
    port: 9001,
    overlay: true,
    public: 'localhost:9001',
  },
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: {
          condition: /^\!/,
          filename: 'jclic.components.LICENSE',
          banner: () => banner,
        },
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
  plugins: [],
};

/**
 * Bundle used by Node.js apps
 */
const nodeConfig = {
  target: 'node',
  entry: './src/JClic.js',
  devtool: 'source-map',
  output: {
    path: dist,
    filename: 'jclic-node.js',
    library: 'jclic',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  externals: [nodeExternals()],
};

module.exports = [mainConfig, nodeConfig];
