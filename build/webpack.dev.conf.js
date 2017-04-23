var webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  PORTS = require('./config/PORTS'),
  config = require('./webpack.base.conf'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  config.entry.app
];

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: PORTS.BROWSER_SYNC,
    proxy: 'localhost:' + PORTS.DEV_SERVER,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
