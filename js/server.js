var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// provide https certificate
var options = {
    key: fs.readFileSync('../ssl/server.key'),
    cert: fs.readFileSync('../ssl/server.crt')
};

var server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// handle requests to the server
server.get('/',function(request,response){
    console.log("Server access registerd.");

    // trigger classification
    var exec = require('child_process').exec;
    var child = exec('java -jar ../jar/server.jar "alcohol trump weed ass fuck"',
        function (error, stdout, stderr){
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(stdout);
            response.end();
            if(error !== null){
                console.log("Error -> "+error);
            }
        });

    module.exports = child;
});

// Create an HTTP service
http.createServer(server).listen(8888);

// Create an HTTPS service
https.createServer(options, server).listen(443, function(){
    console.log("Server is running...");
});