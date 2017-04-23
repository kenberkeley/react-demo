var fs = require('fs-extra'),
  webpack = require('webpack'),
  gulp = require('./gulpfile'),
  PATHS = require('./config/PATHS'),
  config = require('./webpack.prod.conf');

fs.emptyDirSync(PATHS.DIST); // 清空 build 目录
fs.copySync(PATHS.STATIC, PATHS.DIST.join('static')); // 复制高度静态资源

webpack(config, function(err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }));

  // save build info to file
  // fs.writeFile(
  //   PATHS.DIST.join('__build_info__'),
  //   stats.toString({ color: false })
  // );

  // bundle plugins
  gulp.start('default');
});
