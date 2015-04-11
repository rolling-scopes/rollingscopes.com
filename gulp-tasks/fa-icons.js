var through     = require('through2');
var gutil       = require('gulp-util');
var Parser      = require('htmlparser2').Parser;
var vfs         = require('vinyl-fs');
var _           = require('lodash');
var PluginError = gutil.PluginError;

var faRegExp = new RegExp('fa-[^\\s]*');
var usedIcons = {};

var parser = new Parser({
  onopentag: function (name, attribs) {
    var className = attribs.class;
    var iconClass;
    var iconName;

    if (className && className.indexOf('fa') !== -1) {
      iconClass = className.match(faRegExp)[0];
      iconName = iconClass.replace('fa-', '');
      usedIcons[iconName] = null;
    }
  }
});


function used() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isBuffer()) {
      parser.write(file.contents.toString());
      parser.end();
      this.push(Object.keys(usedIcons));
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-useref', 'Streaming not supported'));
      return;
    }

    cb();
  });
}

function copy(options) {
  var cache = {};

  return through.obj(function (iconNames, enc, cb) {
    var paths = _.chain(iconNames)
      .filter(function (name) {
        return !(name in cache);
      })
      .each(function (name) {
        cache[name] = null;
      })
      .map(function (name) {
        return options.src + name + '.svg';
      })
      .value();

    vfs.src(paths)
      .pipe(through.obj(function (iconFile, enc, cb) {
        this.push(iconFile);
        cb();
      }.bind(this)))
      .on('finish', cb);

  });
}

module.exports = {
  used: used,
  copy: copy
};
