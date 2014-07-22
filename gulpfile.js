var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , compass = require('gulp-compass')
  , minify = require('gulp-minify-css')
  , jshint = require('gulp-jshint')
  , concat = require('gulp-concat')
  , imagemin = require('gulp-imagemin')
  , cache = require('gulp-cache')
  , notify = require('gulp-notify')
  , runSequence = require('run-sequence')
  , rimraf = require('gulp-rimraf')
  , gulpIgnore = require('gulp-ignore')

  , paths = {
    css: 'static/css',
    sass: 'assets/sass',
    devSass: 'assets/sass/*.sass',
    devJsLibs: 'assets/scripts/libs/**/*.js',
    devJs: 'assets/scripts/*.js',
    devImg: 'assets/img/**/*',
    img: 'static/img'
  }
  , compassSettings = {
    style: 'compressed',
    css: paths.css,
    sass: paths.sass
  };


gulp.task('libs', function() {
  return gulp.src(paths.devJsLibs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.devJs)
    .pipe(gulpIgnore(paths.devJsLibs))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(paths.devImg)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.img))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('styles', function() {
  return gulp.src(paths.devSass)
    .pipe(compass(compassSettings))
    .pipe(gulp.dest(paths.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Clean up static folder
gulp.task('clean', function(cb) {
  return gulp.src('./static/*', { read: false }) // much faster
    .pipe(rimraf())
    .pipe(notify({ message: 'Clean task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(paths.devJsLibs, ['libs']);
  gulp.watch(paths.devJs, ['scripts']);
  gulp.watch(paths.devImg, ['styles', 'images']);
  gulp.watch(paths.devSass, ['styles']);
});

// Default Task
//gulp.task('default', ['clean']);
gulp.task('default', function() {
  runSequence('clean', ['images', 'styles', 'watch', 'libs', 'scripts']);
});
