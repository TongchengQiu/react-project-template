var path = require('path')
var webpack = require('webpack')

var config = require('../config')

var projectRoot = path.resolve(__dirname, '../')

var baseWebpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: config.entry
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    chunkFilename: '[chunkhash].js',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'styles': path.resolve(__dirname, '../src/assets/styles'),
      'images': path.resolve(__dirname, '../src/assets/images'),
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ['babel'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url?limit=10000&name=[name].[hash:7].[ext]'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: ['json'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        use: ['html', 'markdown'],
        include: projectRoot,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};

if (config.needPrelint) {
  baseWebpackConfig.module.rules.unshift(
    {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      include: projectRoot,
      loader: "eslint-loader",
    }
  )
}

module.exports = baseWebpackConfig;
