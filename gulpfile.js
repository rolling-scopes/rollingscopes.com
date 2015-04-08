var fs          = require('fs');
var gulp        = require('gulp');
var del         = require('del');
var minimist    = require('minimist');
var runSequence = require('run-sequence');
var pngquant    = require('imagemin-pngquant');
var $           = require('gulp-load-plugins')();

var options = {
  src: 'app',
  staging: '.tmp',
  dest: 'appBin'
};

gulp.task('clean', function (cb) {
  del([
    options.dest,
    options.staging
  ], cb);
});

gulp.task('copy', function () {
  return gulp.src(
    options.src + '/*.{ico,png,txt}'
  )
  .pipe(gulp.dest(options.dest));
})

gulp.task('imagemin', function () {
  return gulp.src(
    options.src + '/images/**/*'
  )
  .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      multipass: true,
      use: [pngquant()]
  }))
  .pipe(
    gulp.dest(options.dest + '/images')
  );
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

gulp.task('mustache', function () {
  var archive = JSON.parse(
    fs.readFileSync(options.src + '/data/archive.json')
  );

  return gulp.src(
    options.src + '/templates/*.mustache'
  )
  .pipe($.mustache(archive, {extension: '.html'}))
  .pipe(gulp.dest(options.src));

});

gulp.task('useref', ['css'], function () {
  var assets = $.useref.assets({
    searchPath: ['.tmp', options.src]
  });

  return gulp.src(
    options.src + '/*.html'
  )
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
    'mustache',
    ['copy', 'imagemin', 'useref'],
    cb
  );
});

gulp.task('build:conf', function (cb) {
  options.src = 'conference';
  options.dest = 'conferenceBin';

  runSequence(
    'clean',
    ['copy', 'imagemin', 'useref'],
    cb
  );
});

gulp.task('default', function (cb) {
  runSequence(
    'build:site',
    'build:conf',
    cb
  );
});
