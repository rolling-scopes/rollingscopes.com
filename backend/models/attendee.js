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

module.exports = mongoose.model('Attendee', attendeeSchema);
