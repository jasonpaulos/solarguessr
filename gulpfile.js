var gulp = require('gulp');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var iife = require("gulp-iife");
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src(['client/src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
	return gulp.src(['client/src/**/*.js'])
		.pipe(iife())
		.pipe(concat('solarguessr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/dist/app'))
});

gulp.task('copy', [
	'copy spectre',
	'copy cesium'
], function () {
	return gulp.src([
			'client/src/**',
			'!client/src/**/*.js'
		])
		.pipe(gulp.dest('client/dist'));
});

gulp.task('copy spectre', function () {
	return gulp.src([
			'node_modules/spectre.css/dist/spectre.min.css',
		])
		.pipe(gulp.dest('client/dist/css'));
});

gulp.task('copy cesium', function () {
	return gulp.src([
			'node_modules/cesium/Build/Cesium/**',
		])
		.pipe(gulp.dest('client/dist/cesium'));
});

gulp.task('watch', function () {
	return gulp.watch('client/src/**', ['build']);
});

gulp.task('build', [
	'js',
	'copy'
], function () { });
