/* global module:true __dirname require */

const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');
const buildLocales = require('./build-locales');
const date = new Date();
const dist = path.resolve(__dirname, 'dist');

buildLocales();

const ESLintOptions = {};

const banner = `
${pkg.title} version ${pkg.version} (${date.toISOString().substring(0, 10)})
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
 * Inline assets as raw text or Base64 URIs
 * See: https://webpack.js.org/guides/asset-modules/
 */
const assetRules = [
  {
    test: /\.css$/,
    type: 'asset/source',
  },
  {
    test: /\.svg$/,
    type: 'asset/source',
  },
  {
    test: /\.png$/,
    type: 'asset/inline',
  },
  {
    test: /\.mp3$/,
    type: 'asset/inline',
  },
];

/**
 * Bundle used in HTML browsers
 */
const mainConfig = {
  // Override when debugging with: `webpack --mode=development`
  // See: https://webpack.js.org/configuration/mode/
  mode: 'production',
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
      ...assetRules,
    ]
  },
  devServer: {
    host: 'localhost',
    port: 9001,
    open: true,
    static: {
      directory: path.join(__dirname, 'test'),
      watch: true,
    },
    client: {
      overlay: true,
      progress: true,
    },
  },
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          filename: 'jclic.components.LICENSE',
          banner: () => banner,
        },
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
  plugins: [
    new ESLintPlugin(ESLintOptions),
  ],
  resolve: {
    fallback: { stream: false }
  },
};

/**
 * Bundle used by Node.js apps
 */
const nodeConfig = {
  target: 'node',
  mode: 'production',
  entry: './src/JClic.js',
  module: {
    rules: [...assetRules],
  },
  devtool: 'source-map',
  output: {
    path: dist,
    filename: 'jclic-node.js',
    library: {
      type: 'commonjs2',
      export: 'default',
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new ESLintPlugin(ESLintOptions),
  ],
};

module.exports = [mainConfig, nodeConfig];
