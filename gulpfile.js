var jshint = require('gulp-jshint'),
    gulp   = require('gulp');

var paths = {
  scripts: ['./lib/*.js', './bin/*.js']
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint']);