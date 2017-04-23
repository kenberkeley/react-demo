/**
 * @export {gulp}
 * 1. gulp.start('default')
 * 2. 命令行执行 gulp
 */
var gulp = require('gulp'),
  fs = require('fs-extra'),
  rev = require('gulp-rev'),
  csso = require('gulp-csso'),
  filter = require('gulp-filter'),
  uglify = require('gulp-uglify'),
  useref = require('gulp-useref'),
  revReplace = require('gulp-rev-replace'),
  PATHS = require('./config/PATHS');

// 合并压缩打包 index.html 中 build 标签内的资源
gulp.task('bundle', function () {
  var jsFilter = filter('**/*.js', { restore: true }),
    cssFilter = filter('**/*.css', { restore: true }),
    userefAssets = useref.assets();

  return gulp.src(PATHS.DIST.join('index.html'))
    .pipe(userefAssets)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(rev())
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest(PATHS.DIST));
});

// 由于插件均被合并压缩打包，故可删除以减少生产环境下的文件量
gulp.task('clean', ['bundle'], function () {
  fs.remove(PATHS.DIST.join('static/plugins'));
});

gulp.task('default', ['bundle', 'clean']);

if (module.parent) {
  module.exports = gulp;
} else {
  gulp.start('default');
}
