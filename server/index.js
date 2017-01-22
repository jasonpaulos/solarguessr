'use strict';

var path = require('path');
var express = require('express');
var session = require('express-session');

var auth = require('./auth/auth.js');

var app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

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

app.use(session({
	secret: 'ilovescotchscotchyscotchscotch',
	maxAge: 31 * 24 * 60 * 60 * 1000,
	name: 'solarguessr.user'
}));

auth(app);

app.listen(8080, function () {
	console.log('Server listening on port 8080')
});
