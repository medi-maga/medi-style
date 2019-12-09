const g = require('gulp');
const $ = require('gulp-load-plugins')();
const pug = require('gulp-pug');

g.task('build_css', () =>
  g.src([
    'css/**/*.styl', '!css/**/_*.styl', '../common/css/**/*.styl', '!../common/css/**/_*.styl'
  ])
  .pipe($.plumber())
  .pipe($.connect.reload())
  .pipe($.stylus({ compress: false }))
  .pipe(g.dest('dest/css/'))
);

g.task('build_img', () =>
  g.src([
    'images/**/*', '../common/images/**/*'
  ])
  .pipe($.plumber())
  .pipe(g.dest('dest/images/'))
);

g.task('build_js', () =>
  g.src([
    'javascripts/**/*.js', '!javascripts/**/_*.js', '../common/javascripts/**/*.js', '!../common/javascripts/**/*.js'
  ])
  .pipe($.plumber())
  .pipe(g.dest('dest/javascripts/'))
);

g.task('build_pug', () =>
  g.src([
    'template/**/*.pug', '!template/**/_*.pug', '../common/template/**/*.pug', '!../common/template/**/*.pug'
  ])
  .pipe($.plumber())
  .pipe(pug({ pretty: true }))
  .pipe(g.dest('dest/'))
);
