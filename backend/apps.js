var path            = require('path');
var express         = require('express');
var nconf           = require('nconf');
var configureApp    = require('./config/express');
var configureRoutes = require('./config/routes');
var apps            = [];


['app', 'conf', 'school'].forEach(function (appName) {
  apps.push(createApp(appName));
});

function createApp(appName) {
  var app = express();
  app.locals.name = appName;
  app.locals.port = nconf.get(app.locals.name + ':service:port');

  var appPublicPath = nconf.get(app.locals.name + ':service:publicPath');
  app.locals.publicPath = path.join(__dirname, '..', appPublicPath);
  console.log(app.locals.publicPath)
  configureApp(app);
  configureRoutes(app);

  return app;
}

module.exports = apps;
