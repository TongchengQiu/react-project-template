const path = require('path');

module.exports = {
  entry: './src/main.js',
  logo: './static/logo.png',
  title: 'title',
  needPrelint: false,
  build: {
    assetsRoot: path.resolve(__dirname, './dist'),
    index: path.resolve(__dirname, './dist/index.html'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 8080,
    proxy: {
      '/api/*': {
        target: 'https://api.umefit.com/',
        secure: false,
      },
    }
  }
};
