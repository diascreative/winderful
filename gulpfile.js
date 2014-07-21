var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , compass = require('gulp-compass')
  , concat = require('gulp-concat-css')
  , minify = require('gulp-minify-css')

  , paths = {
    css: './static/css',
    sass: './assets/sass/',
    devSass: './assets/sass/*.sass'
  }
  , compassSettings = {
    style: 'compressed',
    css: paths.css,
    sass: paths.sass
  };


gulp.task('styles', function() {
  return gulp.src(paths.devSass)
    .pipe(compass(compassSettings))
    .pipe(gulp.dest(paths.css));
});


gulp.task('watch', function() {
  //gulp.watch('./js/*.js', ['scripts']);
  gulp.watch(paths.devSass, ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'watch']);
