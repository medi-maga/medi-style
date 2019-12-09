const g = require('gulp');

g.task('watch_css', () => g.watch('css/**/*.styl', [ 'build_css' ]));
g.task('watch_css_common', () => g.watch('../common/css/**/*', [ 'build_css' ]));

g.task('watch_js', () => g.watch('javascripts/**/*.js', [ 'build_js' ]));
g.task('watch_js_common', () => g.watch('../common/javascripts/**/*', [ 'build_js' ]));

g.task('watch_img', () => g.watch('images/**/*', [ 'build_img' ]));
g.task('watch_img_common', () => g.watch('../common/images/**/*', [ 'build_img' ]));;