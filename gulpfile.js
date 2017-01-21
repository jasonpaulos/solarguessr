var gulp = require('gulp');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var iife = require("gulp-iife");

gulp.task('js', function () {
	return gulp.src(['client/src/**/*.js'])
		.pipe(iife())
		.pipe(concat('solarguessr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/dist/app'))
});

gulp.task('copy', [
	'copy spectre',
	'copy angular',
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

gulp.task('copy angular', function () {
	return gulp.src([
			'node_modules/angular/angular.min.js',
			'node_modules/angular/angular.min.js.map',
			'node_modules/angular-route/angular-route.min.js',
			'node_modules/angular-route/angular-route.min.js.map',
			'node_modules/angular-animate/angular-animate.min.js',
			'node_modules/angular-animate/angular-animate.min.js.map'
		])
		.pipe(gulp.dest('client/dist/js'));
});

gulp.task('watch', function () {
	return gulp.watch('client/src/**', ['build']);
});

gulp.task('build', [
	'js',
	'copy'
], function () { });
