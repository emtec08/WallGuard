var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');

// provide https certificate
//var options = {
  //  key: fs.readFileSync('../ssl/server.key'),
    //cert: fs.readFileSync('../ssl/server.crt')
//};

var server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post('/',function(request,response){
    console.log("Server access registerd.");
    console.log(request.body.post);

    // trigger classification
    var exec = require('child_process').exec;
    var child = exec('java -jar jar/server.jar ' + request.body.post,
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
//http.createServer(server).listen(8888);

// Create an HTTPS service
//https.createServer(options, server).listen(443, function(){
  //  console.log("Server is running...");
//});



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});