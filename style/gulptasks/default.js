const g = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

g.task('default', (callback) =>
  runSequence(
    'build_css',
    'build_js',
    'build_img',
    'watch_css',
    'watch_css_common',
    'watch_js',
    'watch_js_common',
    'watch_img',
    'watch_img_common',
    'server',
    callback
  )
);