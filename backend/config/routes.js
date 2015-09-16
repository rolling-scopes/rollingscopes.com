var registration = require('../controllers/registration');
var subscription = require('../controllers/subscription');

module.exports = function configureRoutes(app) {
  switch (app.locals.name) {
    case 'app':
      app.post('/register', registration);
    case 'conf':
      app.post('/subscribe', subscription);
  }
}
