'use strict';

var async = require('async');
var config = require('./config.json');
var db = require('monk')(config.db);
var users = db.get('users');
var scores = db.get('scores');

module.exports = function register(app) {
	
	app.post('/score', function (req, res, next) {
                if (!req.isAuthenticated()) {
                        return next();
                }
		
		var score = req.body.score;
		if (!score || typeof score != 'number' || score > 11000) {
			return res.status(400).end();
		}
		
		scores.insert({
			facebook_id: req.user.facebook_id,
			score: Math.round(req.body.score),
			date: new Date()
		}, function (err) {
			if (err) return res.status(500).end();
			
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				ok: true
			}));
		});
		
        });
	
	app.get('/leaderboard', function (req, res, next) {
		var query = {};
		var opts = {};
		
		if (req.query.friends == 1 && req.isAuthenticated()) {
			query.facebook_id = {
				$in: req.user.friends.concat([req.user.facebook_id])
			};
		}
		
		req.query.limit = parseInt(req.query.limit || 10, 10);
		opts.limit = typeof req.query.limit == 'number' && req.query.limit <= 50 && req.query.limit > 0 ? Math.round(req.query.limit) : 10;
		opts.sort = {};
		
		if (req.query.sort === 'score' || req.query.sort === 'date') {
			var sortDir = -1;
			
			req.query.sortDir = parseInt(req.query.sortDir || -1, 10);
			if (req.query.sortDir === 1 || req.query.sortDir === -1) {
				sortDir = req.query.sortDir;
			}
			
			opts.sort[req.query.sort] = sortDir;
		} else {
			opts.sort.score = -1;
		}
		
		scores.find(query, opts, function (err, docs) {
			if (err) return res.status(500).end();
			
			async.map(docs, function (doc, done) {
				users.findOne({ facebook_id: doc.facebook_id }, { fields: {fullName: 1, picture: 1} }, function (err, user) {
					if (err) return done(err);
					
					return done(null, {
						fullName: user.fullName,
						picture: user.picture,
						score: doc.score,
						date: doc.date
					});
				});
			}, function (err, result) {
				if (err) return res.status(500).end();
				
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(result));
			});
		});
	});
	
};
