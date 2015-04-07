var gulp        = require('gulp');
var gulpif      = require('gulp-if');

var minimist    = require('minimist');
var gulpOptions = require('./gulp-options');

var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');

var options = minimist(process.argv.slice(2), gulpOptions);
options.dest = options.src + 'Bin';

var useref      = require('gulp-useref');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var htmlmin     = require('gulp-htmlmin');

gulp.task('imagemin', function () {
  return gulp.src(
    options.src + '/images/**/*'
  )
  .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      multipass: true,
      use: [pngquant()]
  }))
  .pipe(
    gulp.dest(options.dest + '/images')
  );
});

gulp.task('useref', function () {
  var assets = useref.assets();

  return gulp.src(
    options.src + '/*.html'
  )
  .pipe(assets)
  .pipe(gulpif('*.js', uglify()))
  .pipe(gulpif('*.css', minifyCss()))
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(options.dest));
});
