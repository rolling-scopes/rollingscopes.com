var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var del         = require('del');
var minimist    = require('minimist');
var runSequence = require('run-sequence');
var pngquant    = require('imagemin-pngquant');
var $           = require('gulp-load-plugins')();
var pages       = require('./app/pages');
var tasks       = require('./gulp-tasks');

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
});

gulp.task('copy:school', ['copy'], function () {
  return gulp.src([
    options.src + '/css/**/*',
    options.src + '/fonts/**/*',
    options.src + '/scripts/**/*',
    options.src + '/slides/**/*',
    options.src + '/tasks/**/*',
    options.src + '/materials/**/*',
    options.src + '/bower_components/**/*',
    options.src + '/*.html'
  ], {
    base: path.join(__dirname, options.src)
  })
  .pipe(gulp.dest(options.dest));
});

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

gulp.task('views', function () {
  var pageConfig;

  return gulp.src(options.src + '/templates/*.ejs')
    .pipe(tasks.ejs(pages))
    .pipe(gulp.dest(options.staging));
});

gulp.task('mustache:school', function () {
  var data = {
    talks: JSON.parse(
      fs.readFileSync(options.src + '/data/talks.json')
    ),
    tasks: JSON.parse(
      fs.readFileSync(options.src + '/data/tasks.json')
    ),
    webinar_talks: JSON.parse(
      fs.readFileSync(options.src + '/data/js-webinar/talks.json')
    )
  };

  function addIndices(collection, reverse) {
    var length = collection.length;
    collection.forEach(function (item, index) {
      index++;
      item.index = reverse ? length - index : index;
    });
  }

  addIndices(data.talks);
  addIndices(data.webinar_talks);
  data.talks
    .reverse()
    .forEach(function (talk) {
      if (talk.description) {
        talk.description = talk.description.replace(/\n/g,"<br />");
      }
      if (talk.links && talk.links.length) {
        talk.hasLinks = true;
      }
    });

  data.tasks.forEach(function (task) {
    task.task_page_link = task.link;
    if (task.md) {
      task.link = './tasks.html#' + task.md;
      task.task_page_link = '#' + task.md;
    }
  });

  return gulp.src(
    options.src + '/templates/**/*.mustache'
  )
  .pipe($.mustache(data, {extension: '.html'}))
  .pipe(gulp.dest(options.dest));

});

gulp.task('useref', ['css'], function () {
  var assets = $.useref.assets({
    searchPath: ['.tmp', options.src]
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

gulp.task('build:conf-archive', function (cb) {
  options.src = 'conference/archive/2015';
  options.dest = 'conferenceBin/archive/2015';

  runSequence(
    'clean',
    ['copy', 'imagemin', 'useref'],
    cb
  );
});

gulp.task('build:school', function (cb) {
  options.src = 'school';
  options.dest = 'schoolBin';

  runSequence(
    'clean',
    'mustache:school',
    'copy:school',
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
