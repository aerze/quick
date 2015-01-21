'use strict';
console.log('help.js :: loaded');

var Help = function() {
	this.xhr  = function(type, path, data, callback) {
		var request = new XMLHttpRequest();
		request.open(type, path, true);
		request.onreadystatechange = function () {
			if (request.readyState !== 4 || request.status !== 200) return;
			callback(request.responseText);
		}
		// request.setRequestHeader('content-type', 'application/octet-stream');
		request.send(data);
	}
};

window.help = new Help();