'use strict';

var path = require('path');
var express = require('express');
var app = express();

var routes = [
	'/'
];

//Route redirects
routes.forEach(function (route) {
	app.get(route, handler);
});

function handler(req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
}

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(8080, function () {
	console.log('Server listening on port 8080')
});
