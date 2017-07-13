var fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf'),
  commonPath = require('./webpack.base.conf').commonPath,
  express = require('express'),
  port = process.env.PORT || 9091,
  app = express();

webpack(config, function(err, stats) {
  // show build info to console
  console.log( stats.toString({ chunks: false, color: true }) );

  // save build info to file
  fs.writeFile(
    path.join(commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  );

  var rootPath = path.resolve(__dirname, '..')
  // 通常用于加载静态资源
  app.use(express.static(rootPath + '/dist'))
  // 将所有路径指向index
  app.get('*', function (request, response){
    response.sendFile(rootPath + '/dist/index.html')
  })
  app.listen(port)
  console.log("server started on port " + port)
});
