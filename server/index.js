'use strict';

var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var config = require('./config.json');
var auth = require('./auth.js');

var app = express();

var store = new MongoDBStore({
	uri: config.db,
	collection: 'sessions'
});

store.on('error', console.error.bind(console));

app.use(session({
	secret: config.sessionSecret,
	maxAge: 31 * 24 * 60 * 60 * 1000,
	name: 'solarguessr.user',
	store: store,
	resave: false,
	saveUninitialized: true
}));

auth(app);

if (config.serveStatic) {
	app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.listen(config.bindPort, config.bindIp, function () {
	console.log('Server listening on port 8080')
});
