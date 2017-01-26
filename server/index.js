'use strict';

var path = require('path');
var express = require('express');
var session = require('express-session');

var auth = require('./auth.js');

var app = express();

app.use(session({
	secret: 'ilovescotchscotchyscotchscotch',
	maxAge: 31 * 24 * 60 * 60 * 1000,
	name: 'solarguessr.user'
}));

auth(app);

app.listen(8080, 'localhost', function () {
	console.log('Server listening on port 8080')
});
