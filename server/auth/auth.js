'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.json');

module.exports = function register(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.serializeUser(function(user, done) {
		process.nextTick(function () {
			done(null, user);
		});
	});
	
	passport.deserializeUser(function(sessionUser, done) {
		process.nextTick(function () {
			done(null, sessionUser);
		});
	});
	
	passport.use(new FacebookStrategy({
		clientID: config.facebook.appId,
		clientSecret: config.facebook.appSecret,
		callbackURL: 'http://localhost:8080/auth/facebook/callback',
		enableProof: true,
		profileFields: [
			'id',
			'email',
			'first_name',
			'displayName',
			'name_format',
			'friends',
			'profileUrl',
			'picture.type(large)'
		]
	}, function(token, refreshToken, profile, done) {
		var user = {
			id: profile.id,
			profile: profile.profileUrl,
			picture: profile.photos[0].value,
			fullName: profile.displayName,
			firstName: profile.name.givenName
		};
		
		//TODO: handle new user
		console.log(JSON.stringify(user, 2, 2));
		
		process.nextTick(function () {
			done(null, user);
		});
	}));
	
	app.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: [
				'email',
				'public_profile',
				'user_friends'
			]
		})
	);
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/',
			successRedirect: '/'
		})
	);
	
	app.get('/user', function (req, res) {
		var user = {};
		
		if (req.isAuthenticated()) {
			user = req.user;
		}
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(user));
	});
	
	app.get('/logout', function (req, res) {
		req.logout();
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			loggedOut: true
		}));
	});
};
