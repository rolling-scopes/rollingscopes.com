var path = require("path");
var gulp = require("gulp");
var del = require("del");
var $ = require("gulp-load-plugins")();
var tasks = require("./gulp-tasks");

var options = {
  src: "public/app",
  staging: "public/.tmp",
  dest: "public/appBin",
};

gulp.task("clean", () => {
  return del([options.dest, options.staging]);
});

gulp.task("copy", () => {
  return gulp
    .src([options.src + "/*.{ico,png,txt}", options.src + "/images/**/*"], {
      base: options.src,
    })
    .pipe(gulp.dest(options.dest));
});

gulp.task(
  "copy:school",
  gulp.series("copy", () => {
    return gulp
      .src(
        [
          options.src + "/css/**/*",
          options.src + "/fonts/**/*",
          options.src + "/scripts/**/*",
          options.src + "/slides/**/*",
          options.src + "/tasks/**/*",
          options.src + "/materials/**/*",
          options.src + "/images/**/*",
          options.src + "/*.html",
        ],
        {
          base: path.join(__dirname, options.src),
        }
      )
      .pipe(gulp.dest(options.dest));
  })
);

gulp.task("compile-sass", function () {
  return gulp
    .src(options.src + "/sass/*.scss")
    .pipe($.sass().on("error", $.sass.logError))
    .pipe($.autoprefixer({ grid: false }))
    .pipe(gulp.dest(options.dest + "/styles"));
});

gulp.task("css", function () {
  return gulp
    .src(options.src + "/styles/*.css")
    .pipe(
      $.autoprefixer({
        grid: false,
        cascade: false,
      })
    )
    .pipe(gulp.dest(options.staging));
});

gulp.task("views", function () {
  var pages = require("./" + options.src + "/pages");

  return gulp
    .src(
      Object.keys(pages).map((page) => options.src + `/templates/${page}.ejs`)
    )
    .pipe(tasks.ejs(pages))
    .pipe(gulp.dest(options.staging));
});

gulp.task("conf-views", function () {
  var pages = require("./" + options.src + "/pages");

  return gulp
    .src("public/conference/templates/*.ejs")
    .pipe(tasks.ejs(pages))
    .pipe(gulp.dest(options.staging));
});

gulp.task(
  "useref",
  gulp.series("css", function () {
    return gulp
      .src([options.staging + "/*.html", options.src + "/*.html"])
      .pipe($.useref({ searchPath: [options.staging, options.src] }))
      .pipe($.if("*.css", $.csso()))
      .pipe($.htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(options.dest));
  })
);

gulp.task(
  "build:site",
  gulp.series("clean", "views", gulp.parallel("copy", "useref", "compile-sass"))
);

gulp.task("build:conf-archive", () => {
  return gulp
    .src("public/conference/archive/**/*")
    .pipe(gulp.dest("public/conferenceBin/archive/"));
});

gulp.task("build:conf-speakers", () => {
  return gulp
    .src("public/conference/speaker/**/*")
    .pipe(gulp.dest("public/conferenceBin/speaker/"));
});

gulp.task(
  "build:conf",
  gulp.series(
    function (cb) {
      options.src = "public/conference";
      options.dest = "public/conferenceBin";
      cb();
    },
    "clean",
    "conf-views",
    "build:conf-speakers",
    gulp.parallel("copy", "useref", "compile-sass")
  )
);

gulp.task(
  "build:school",
  gulp.series(
    (cb) => {
      options.src = "public/rsschool-landing";
      options.dest = "public/schoolBin";
      cb();
    },
    "clean",
    gulp.parallel("copy:school", "useref", "compile-sass")
  )
);

gulp.task(
  "default",
  gulp.series("build:site", "build:conf", "build:conf-archive", "build:school")
);
