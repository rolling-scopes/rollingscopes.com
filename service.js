var bodyParser = require('body-parser');
var register   = require('./register.js');
var express    = require('express');
var fs         = require('fs');
var path       = require('path');
var app        = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('./dist'));

app.get('/csvdb', function (req, res) {
  fs.readFile(path.join(__dirname, 'registered.txt'), 'utf8', function(_, data) {
    console.log(data);
    res.send(data);
  });
});

app.post('/register', function (req, res) {
  register(req.body);
  res.redirect('/');
});

app.listen(8080);
