var bodyParser      = require('body-parser');
var register        = require('./register.js');
var express         = require('express');
var fs              = require('fs');
var path            = require('path');
var compression     = require('compression');
var nconf           = require('nconf');
var mongoose        = require('mongoose');
var app             = express();
var rsRouter        = express.Router();
var rsConfRouter    = express.Router();
var schoolRouter    = express.Router();
var subdomainRouter = express.Router();
var mailchimp       = require('./mailchimp');

nconf.env('__');
mongoose.connect(
  nconf.get('mongo:connection_string') ||
  'mongodb://localhost/rs-test'
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

subdomainRouter.use(function (req, res, next) {
  if (req.subdomains.length > 0) {
    switch (req.subdomains[0]) {
      case 'conf':
        rsConfRouter(req, res, next);
        break;
      case 'school':
        schoolRouter(req, res, next);
        break;
      default:
        rsRouter(req, res, next);
    }
  } else {
    next();
  }
});

rsRouter.use(express.static('./appBin'));
rsConfRouter.use(express.static('./conferenceBin'));
schoolRouter.use(express.static('./schoolBin'));

app.use(subdomainRouter);
app.use(rsRouter);
app.use(rsConfRouter);
app.use(schoolRouter);

app.get('/buy-ticket', function (req, res) {
  res.redirect('http://www.kvitki.by/ru/event/23971');
});

app.post('/register', function (req, res) {
  register(req.body);
  res.redirect('/');
});

app.post('/subscribe', function (req, res) {
  var email = req.body.email;
  email = email.toLowerCase();

  var valid = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

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
});


var PORT = nconf.get('service:port') || 3000;
app.listen(PORT, function () {
  console.log('server is listening on port ' + PORT);
});
