var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var del         = require('del');
var minimist    = require('minimist');
var runSequence = require('run-sequence');
var $           = require('gulp-load-plugins')();
var tasks       = require('./gulp-tasks');

var options = {
  src: 'public/app',
  staging: 'public/.tmp',
  dest: 'public/appBin'
};

gulp.task('clean', function (cb) {
  del([
    options.dest,
    options.staging
  ], cb);
});

gulp.task('copy', function () {
  return gulp.src([
    options.src + '/*.{ico,png,txt}',
    options.src + '/images/**/*'
  ], { base: options.src })
  .pipe(gulp.dest(options.dest));
});

gulp.task('copy:school', ['copy'], function () {
  return gulp.src([
    options.src + '/css/**/*',
    options.src + '/fonts/**/*',
    options.src + '/scripts/**/*',
    options.src + '/slides/**/*',
    options.src + '/tasks/**/*',
    options.src + '/materials/**/*',
    options.src + '/images/**/*',
    options.src + '/bower_components/**/*',
    options.src + '/*.html'
  ], {
    base: path.join(__dirname, options.src)
  })
  .pipe(gulp.dest(options.dest));
});

gulp.task('css', function () {
  return gulp.src(
    options.src + '/styles/*.css'
  )
  .pipe($.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(options.staging));
});

gulp.task('views', function () {
  var pages = require('./' + options.src + '/pages');

  return gulp.src(options.src + '/templates/*.ejs')
    .pipe(tasks.ejs(pages))
    .pipe(gulp.dest(options.staging));
});

gulp.task('useref', ['css'], function () {
  var assets = $.useref.assets({
    searchPath: [options.staging, options.src]
  });

  return gulp.src([
    options.staging + '/*.html',
    options.src + '/*.html'
  ])
  .pipe(assets)
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.csso()))
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe($.htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(options.dest));
});

gulp.task('build:site', function (cb) {
  runSequence(
    'clean',
    'views',
    ['copy', 'useref'],
    cb
  );
});

gulp.task('build:conf', function (cb) {
  options.src = 'public/conference';
  options.dest = 'public/conferenceBin';

  runSequence(
    'clean',
    'views',
    ['copy', 'useref'],
    cb
  );
});

gulp.task('build:conf-archive', function (cb) {
  options.src = 'public/conference/archive/2015';
  options.dest = 'public/conferenceBin/archive/2015';

  runSequence(
    'clean',
    ['copy', 'useref'],
    cb
  );
});

gulp.task('build:school', function (cb) {
  options.src = 'public/school';
  options.dest = 'public/schoolBin';

  runSequence(
    'clean',
    'views',
    ['copy:school', 'useref'],
    cb
  );
});

gulp.task('default', function (cb) {
  runSequence(
    'build:site',
    'build:conf',
    'build:conf-archive',
    'build:school',
    cb
  );
});
