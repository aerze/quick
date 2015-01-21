'use strict';
process.title = 'VICI Micro Service';

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    http = require('http'),
    os = require('os');

http.globalAgent.maxSockets = 50;

var localAddress = {};

var app = express();
app.use(cookieParser());
// app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));


var people = [];
app.post('/login', function(req, res) {
    people.push(req.body);
    console.log(req.body);
    res.send('OK');
});


var server = app.listen(3000, function() {
    localAddress = server.address();
    console.log('Server: Listening on port ' + server.address().port);
    console.log('\tMax Sockets: ' + http.globalAgent.maxSockets);
    console.log('\tHostname: ' + os.hostname());
    console.log('\tLocal Area IP: ' + getLocalAreaIP());
});

// Test string to VICI
// http://10.10.7.25/agc/api.php?source=lifelock&user=49721682&pass=856RJ9KzKdvVXm8MNWyJ&agent_user=1000&function=recording&value=STOP

function getLocalAreaIP () {
    var networkInterfaces = os.networkInterfaces();
    var netKeys = Object.keys(networkInterfaces);
    var localAreaIP;

    for (var i = netKeys.length - 1; i >= 0; i--) {
        if (netKeys[i].match(/(Local Area Connection)+\s\d?/g)) {
            // console.log('Found it!' + netKeys[i]);
            localAreaIP = os.networkInterfaces()[netKeys[i]][0].address;
        }
    }
    return localAreaIP;
}