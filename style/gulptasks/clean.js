const g = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const del = require('del');
const path = require('path');

g.task('clean', () =>
  del('dest/**/*', { dot: true, force: true })
);

g.task('copy_img', () =>
  g.src([
    '../common/images/*'
  ])
  .pipe(g.dest('dest/images/'))
);

g.task('copy_js', () =>
  g.src([
    '../common/javascripts/**/*'
  ])
  .pipe(g.dest('dest/javascripts/'))
);

g.task('copy_css', () =>
  g.src([
    '../common/css/**/*.styl', '!../common/css/**/_*.styl'
  ])
  .pipe($.plumber())
  .pipe($.stylus({ compress: false }))
  .pipe(g.dest('dest/css/'))
);

g.task('refresh', (callback) =>
  runSequence(
    'clean',
    'copy_img',
    'copy_js',
    'copy_css',
    'build_img',
    'build_js',
    'build_css',
    'build_pug',
    callback
  )
);
