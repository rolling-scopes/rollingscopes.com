var path     = require('path');
var nconf    = require('nconf');
var mongoose = require('mongoose');

console.log('service is starting');

nconf
  .env('__')
  .file(path.join(__dirname, 'backend', 'config', 'nconf.json'));

mongoose.connect(
  nconf.get('mongo:connection_string') ||
  'mongodb://localhost/rs-test'
);

var apps = require('./backend/apps');

apps.forEach(function (app) {
  app.listen(app.locals.port);
  console.log('Server of ' + app.locals.name + ' is listening on port %s', app.locals.port);
});

