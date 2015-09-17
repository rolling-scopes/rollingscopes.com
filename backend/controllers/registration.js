var Attendee = require('../models/attendee.js');

module.exports = function register(req, res) {
  Attendee.create(req.body);
  res.redirect('/');
}
