var gulp        = require('gulp');
var minimist    = require('minimist');
var gulpOptions = require('./gulp-options');

var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');

var options = minimist(process.argv.slice(2), gulpOptions);
options.dest = options.src + 'Bin';

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
