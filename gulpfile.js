var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('copy', ['copy angular'], function () {
	return gulp.src([
			'client/src/*'
		])
		.pipe(gulp.dest('client/dist'));
});

gulp.task('copy angular', function () {
	return gulp.src([
			'node_modules/angular/angular.min.js',
			'node_modules/angular/angular.min.js.map'
		])
		.pipe(gulp.dest('client/dist/js'));
});

gulp.task('watch', function () {
	return gulp.watch('client/src/*', ['default']);
});

gulp.task('webserver', ['default', 'watch'], function () {
	return gulp.src('client/dist')
		.pipe(server({
			livereload: true,
			open: true
		}));
});

gulp.task('default', [
	'copy'
], function () { });
