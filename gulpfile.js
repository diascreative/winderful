var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  compass = require('gulp-compass');
  minify = require('gulp-minify-css');

gulp.task('styles', function() {
  return gulp.src('./sass/*.sass')
    .pipe(compass())
    .pipe(minify())
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
  //gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./sass/*.sass', ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'watch']);
