const g = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const url = require('url');
const path = require('path');
const fs = require('fs');
const pug = require('pug');

const pugMiddleWare = (req, res, next) => {
  const basedir = process.cwd();
  const requestPath = getPugTemplatePath(basedir,req)
  if (path.parse(requestPath).ext !== '.html') {
    return next();
  }
  const pugPath = requestPath.replace('.html', '.pug');
  try{
    console.log('file '+ pugPath)
    fs.statSync(pugPath)
    const content = pug.renderFile(pugPath, {
      locals:{},
      pretty: true,
      basedir,
      compileDebug: true,
      doctype: 'html'
    });
    res.end(new Buffer(content));
  } catch (e) {
    console.log(e)
    return next();
  }
}

const getPugTemplatePath = (baseDir,req) => {
  const requestPath = url.parse(req.url).pathname;
  const suffix = path.parse(requestPath).ext ? '' : 'index.html'
  return path.join(baseDir, 'template', requestPath, suffix);
}

g.task('server', () => {
  browserSync({
    server:{
      middleware: [pugMiddleWare],
      baseDir: 'dest/',
      index: 'dest/index.html',
      open: false
    }
  })
  return g.watch(process.cwd() + 'template/', () => {
  setTimeout(function() {
    browserSync.reload();
  }, 500);
  });
});
