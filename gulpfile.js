var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var del         = require('del');
var runSequence = require('run-sequence');
var $           = require('gulp-load-plugins')();
var tasks       = require('./gulp-tasks');

var options = {
  src: 'public/app',
  staging: 'public/.tmp',
  dest: 'public/appBin'
};

gulp.task('clean', function () {
  return del([
    options.dest,
    options.staging
  ]);
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

gulp.task('compile-sass', function () {
  return gulp.src(options.src + '/sass/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(options.dest + "/styles"));
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

  return gulp.src(Object.keys(pages).map(page => options.src + `/templates/${page}.ejs`))
    .pipe(tasks.ejs(pages))
    .pipe(gulp.dest(options.staging));
});

gulp.task('useref', ['css'], function () {
  return gulp.src([
    options.staging + '/*.html',
    options.src + '/*.html'
  ])
  .pipe($.useref({ searchPath: [options.staging, options.src] }))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.csso()))
  .pipe($.htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(options.dest));
});

gulp.task('build:site', function (cb) {
  runSequence(
    'clean',
    'views',
    ['copy', 'useref', 'compile-sass'],
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
  return gulp.src('public/conference/archive/**/*')
    .pipe(gulp.dest('public/conferenceBin/archive/'));
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
