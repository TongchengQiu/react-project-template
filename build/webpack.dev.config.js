var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var baseWebpackConfig = require('./webpack.base.config')

var config = require('../config')

var port = process.env.PORT || config.dev.port

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ].concat(baseWebpackConfig.entry[name])
})

module.exports = merge.smart(baseWebpackConfig, {
  cache: true,
  devtool: '#source-map',
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${port}`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ]
});
