var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha  = require('gulp-mocha'),
    chai   = require('chai'),
    sinon  = require('sinon');

var paths = {
  scripts: ['./lib/**/*.js', './bin/**/*.js'],
  tests: ['./spec/**/*.js']
};

gulp.task('test', function () {
  return gulp.src(paths.tests, { read: false })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.start('test');
  gulp.watch(paths.scripts, ['test']);
  gulp.watch(paths.tests, ['test']);
});

gulp.task('default', ['lint', 'test']);
