var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  compass = require('gulp-compass');
  minify = require('gulp-minify-css'),
  paths = {
    css: './static/css',
    sass: './assets/sass/*.sass'
  },
  compassSettings = {
    css: paths.css,
    sass: './assets/sass/'
  };

gulp.task('styles', function() {
  return gulp.src(paths.sass)
    .pipe(compass(compassSettings));
});

gulp.task('watch', function() {
  //gulp.watch('./js/*.js', ['scripts']);
  gulp.watch(paths.sass, ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'watch']);
