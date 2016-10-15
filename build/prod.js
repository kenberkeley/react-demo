var fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf');

webpack(config, function(err, stats) {
  // show build info to console
  console.log( stats.toString({ chunks: false, color: true }) );

  // save build info to file
  fs.writeFile(
    path.join(config.commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  );
});
