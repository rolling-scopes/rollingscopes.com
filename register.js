var fs = require('fs');
var mongoose = require('mongoose');

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

var attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  }
});

attendeeSchema
  .path('email')
  .validate(function (email) {
    return emailRegex.test(email);
  });

var Attendee = mongoose.model('Attendee', attendeeSchema);

function register(person) {
  Attendee.create(person);
}

module.exports = register
