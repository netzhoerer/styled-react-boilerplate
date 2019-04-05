const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest/index');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

modules.exports = merge(baseConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      favicon: '../public/favicon.png',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new ExtractCssChunks(
      {
        filename: '[name].css',
        chunkFilename: '[id].css',
        hot: true,
      },
    ),
    new ScriptExtHtmlWebpackPlugin({
      prefetch: /\.js$/,
      defaultAttribute: 'async',
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    /* eslint-disable camelcase */
    new WebpackPwaManifest({
      name: 'Codeshot',
      short_name: 'Codeshot',
      description: 'Codeshots - beautiful code screenshots',
      theme_color: '#212121',
      background_color: '#212121',
      icons: [
        {
          src: path.resolve('public/favicon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          ios: true,
        },
      ],
    }),
    /* eslint-enable camelcase */
    new OfflinePlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
