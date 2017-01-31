'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.json');
var db = require('monk')(config.db);
var users = db.get('users');

module.exports = function register(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.serializeUser(function(user, done) {
		process.nextTick(function () {
			done(null, user._id);
		});
	});
	
	passport.deserializeUser(function(sessionUser, done) {
		users.findOne({ _id: sessionUser }, function (err, doc) {
			if (err) return done(err);
			
			return done(null, doc);
		});
	});
	
	passport.use(new FacebookStrategy({
		clientID: config.authentication.facebook.appId,
		clientSecret: config.authentication.facebook.appSecret,
		callbackURL: config.baseUrl + '/auth/facebook/callback',
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
			facebook_id: profile.id,
			profile: profile.profileUrl,
			picture: profile.photos[0].value,
			fullName: profile.displayName,
			firstName: profile.name.givenName,
			friends: profile._json.friends.data.map(function (f) { return f.id; })
		};
		
		users.findOneAndUpdate({
			facebook_id: user.facebook_id
		}, user, {
			upsert: true,
			returnNewDocument: true
		}, function (err, doc) {
			if (err) return done(err);
			
			done(null, doc);
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
