/**
 * Created by yanzexin on 16/11/7.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var cache = {};

var server = http.createServer();
server.on('request', function (req, res) {
    var filePath = false;
    if (req.url == '/') {
        filePath = "./html/login.html";
    } else {
        filePath = "./html/" + req.url;
    }
   res.writeHead(200, {'content-type': 'text/plain'});
    serveStatic(res, cache, filePath);
});
server.listen('8000');

function send404(response) {
    response.writeHead(404, {"Content-type":"text/plain"});
    serveStatic(response, cache, "./html/404.html");
}

function sendFile(response, filePath, fileContent) {
    response.writeHead(200, {'Content-type': mime.lookup(path.basename(filePath))});
    response.end(fileContent);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists){
                fs.readFile(absPath, function (err, data) {
                   if (err) {
                       send404(response);
                   } else {
                       cache[absPath] = data;
                       sendFile(response, absPath, data);
                   }
                });
            } else {
                send404(response);
            }
        });
    }
}