var request = require('request');
var nconf   = require('nconf');
var md5     = require('md5');

nconf.env('__');

var MAILCHIMP_API_ENDPOINT = nconf.get('mailchimp:api_endpoint');
var MAILCHIMP_API_KEY      = nconf.get('mailchimp:apikey');
var CONF_LIST_ID           = nconf.get('mailchimp:conf_list_id');

var api = {};

api.isSubscribed = function (email) {
  var options = createRequestOptions();
  var hash = md5(email);
  options.url += '/lists/' + CONF_LIST_ID + '/members/' + hash;
  options.method = 'GET';

  return new Promise(createExecutor(options));
}

api.subscribe = function (email) {
  var options = createRequestOptions();
  options.url += '/lists/' + CONF_LIST_ID + '/members/';
  options.method = 'POST';
  options.json = {};
  options.json.email_address = email.toLowerCase();
  options.json.status = 'subscribed';

  return new Promise(createExecutor(options));
};

function createRequestOptions(method) {
  return {
    url: MAILCHIMP_API_ENDPOINT + '/3.0/',
    headers: {
      'Authorization': 'apikey ' + MAILCHIMP_API_KEY
    }
  };
}

function createExecutor(options) {
  return function (resolve, reject) {
    request(options, function (err, res, body) {
      if (err || res.statusCode !== 200) {
        return reject(err);
      }

      resolve()
    });
  };
}


module.exports = api;
