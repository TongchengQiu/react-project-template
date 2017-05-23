var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var moment = require('moment')

var config = require('../config')

var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.config')
  : require('./webpack.dev.config')

var port = process.env.PORT || config.dev.port

var compiler = webpack(webpackConfig);

var start;

compiler.plugin('compile', function() {
  start = moment();
  console.log(start.format('hh:mm:ss') + ' Bundling...');
});

compiler.plugin('emit', function(compilation, callback) {
  var now = moment();
  console.log('Duration: ' + now.diff(start, 's') + 's');
  console.log('Hash: ' + compilation.hash);

  callback();
});

new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../'),
  noInfo: false,
  proxy: config.dev.proxy,
  inline: true,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(port, 'localhost', function(err) {
  if (err) {
    console.log('err', err);
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
