var static = require('node-static');
var http = require('http');

var file = new(static.Server)("./dist", { cache: 2592000, gzip: true });

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(8080);