const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest/index');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    quiet: true,
    hot: true,
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            /* eslint-disable camelcase */
            ascii_only: true,
            /* eslint-enable camelcase */
          },
        },
        parallel: true,
        cache: true,
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
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
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
