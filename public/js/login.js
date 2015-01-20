'use strict';

console.log('login.js :: loaded');
var peer;
var connectionsArray = [];

var loginMenu = document.querySelector('.loginMenu');
var loginInput = document.querySelector('.loginInput');
var loginButton = document.querySelector('.loginButton');

loginInput.read = function(callback) {
    var data = this.value;
    this.value = '';
    callback(data);
};

loginButton.onclick = function() {
    loginInput.read(function(data) {
        peer = new Peer(data, {key: 'lovhnkqu8h69a4i'});

        peerInit(peer);

        peer.on('open', function(id) {
            console.log('Peer ID: ' + id);
        });
        peer.on('connection', function(conn) {
            conn.on('data', function(data) {
                textbox.add(data);
            });
        });
    });
};