var t2  = require('through2');
var ejs = require('ejs');

module.exports = function (datasets) {
  return t2.obj(function (file, encoding, done) {
    var data;
    var pageName = file.path
      .replace(file.base, '')
      .replace('.ejs', '');

    data = datasets[pageName];
    data.filename = file.path;
    data.pageName = pageName;

    file.contents = new Buffer(ejs.render(file.contents.toString('utf-8'), data));
    file.path = file.path.replace(/\.ejs$/, '.html');

    this.push(file);
    done();
  });
};
