var bodyParser = require('body-parser');
var register   = require('./register.js');
var express    = require('express');
var app        = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('./dist'));

app.post('/register', function (req, res) {
  register(req.body);
  res.redirect('/');
});

app.listen(8080);
