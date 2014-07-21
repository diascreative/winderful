var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , compass = require('gulp-compass')
  , minify = require('gulp-minify-css')
  , jshint = require('gulp-jshint')
  , concat = require('gulp-concat')

  , paths = {
    css: 'static/css',
    sass: 'assets/sass',
    devSass: 'assets/sass/*.sass',
    devJs: 'assets/scripts/**/*.js'
  }
  , compassSettings = {
    style: 'compressed',
    css: paths.css,
    sass: paths.sass
  };

gulp.task('scripts', function() {
  return gulp.src(paths.devJs)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.devSass)
    .pipe(compass(compassSettings))
    .pipe(gulp.dest(paths.css));
});


gulp.task('watch', function() {
  gulp.watch(paths.devJs, ['scripts']);
  gulp.watch(paths.devSass, ['styles']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);
