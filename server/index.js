'use strict';

var path = require('path');
var express = require('express');
var session = require('express-session');

var config = require('./config.json');
var auth = require('./auth.js');

var app = express();

app.use(session({
	secret: 'ilovescotchscotchyscotchscotch',
	maxAge: 31 * 24 * 60 * 60 * 1000,
	name: 'solarguessr.user'
}));

auth(app);

if (config.serveStatic) {
	app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.listen(config.bindPort, config.bindIp, function () {
	console.log('Server listening on port 8080')
});
