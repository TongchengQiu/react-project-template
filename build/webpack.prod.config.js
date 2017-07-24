var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OfflinePlugin = require('offline-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var baseWebpackConfig = require('./webpack.base.config')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')

const proWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash:4].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, 'chunk[id].[chunkhash:4].js')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: false } },
            { loader: 'sass-loader', options: { sourceMap: false } }
          ],
        }),
        include: projectRoot,
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: path.join(config.build.assetsSubDirectory, '[name].[contenthash:4].css'),
      allChunks: true,
      disable: false,
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: config.logo,
      // The prefix for all image files (might be a folder or a name)
      prefix: path.join(config.build.assetsSubDirectory, 'icons/'),
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: 'transparent',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: config.title,
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new OfflinePlugin()
  ]
})

module.exports = proWebpackConfig
