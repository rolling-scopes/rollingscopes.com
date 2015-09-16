var validEmailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var mailchimp       = require('../apis/mailchimp');

module.exports = function (req, res) {
  var email = req.body.email;
  email = email.toLowerCase();

  var valid = validEmailRegex.test(email);

  if (!email || !valid) {
    return res.status(500)
      .end();
  }

  mailchimp.isSubscribed(email)
    .then(success)
    .catch(subscribe);

  function subscribe() {
    mailchimp.subscribe(email)
      .then(success)
      .catch(error)
  }

  function success() {
    res.status(200).send('done');
  }

  function error() {
    res.status(500).end();
  }
}
