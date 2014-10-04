var fs = require('fs');

function toCSV(o) {
  var csv = '';
  for (var p in o) {
    csv = csv + o[p] + ';'
  }
  csv += '\n';
  return csv;
}

function register(person) {
  fs.writeFile('registered.txt', toCSV(person), {flag: 'a'}, function (err) {});
}

module.exports = register
