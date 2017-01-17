var gulp = require('gulp');
var server = require('gulp-server-livereload');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var iife = require("gulp-iife");

gulp.task('js', function () {
	return gulp.src(['client/src/**/*.js'])
		.pipe(iife())
		.pipe(concat('solarguessr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/dist/js'))
});

gulp.task('copy', [
	'copy angular',
	'copy cesium'
], function () {
	return gulp.src([
			'client/src/**',
			'!client/src/**/*.js'
		])
		.pipe(gulp.dest('client/dist'));
});

gulp.task('copy cesium', function () {
	return gulp.src([
			'node_modules/cesium/Build/Cesium/**',
		])
		.pipe(gulp.dest('client/dist/cesium'));
});

gulp.task('copy angular', function () {
	return gulp.src([
			'node_modules/angular/angular.min.js',
			'node_modules/angular/angular.min.js.map'
		])
		.pipe(gulp.dest('client/dist/js'));
});

gulp.task('watch', function () {
	return gulp.watch('client/src/**', ['default']);
});

gulp.task('webserver', ['default', 'watch'], function () {
	return gulp.src('client/dist')
		.pipe(server({
			livereload: true,
			open: true
		}));
});

gulp.task('default', [
	'js',
	'copy'
], function () { });
