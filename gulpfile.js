var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , sass = require('gulp-ruby-sass')
  , autoprefixer = require('gulp-autoprefixer')
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
  ,
  reportError = function(err) {
    if( typeof err.fileName !== 'undefined' )
      return  "\n" + err.fileName + ': line ' + err.lineNumber + ', ' + err.message;
    else
      return err;
  };


gulp.task('libs', function() {
  return gulp.src(paths.devJsLibs)
    .pipe(concat('libs.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('static/js'));
});

gulp.task('scripts', function() {
  var s = gulp.src(paths.devJs)
    .pipe(gulpIgnore(paths.devJsLibs))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(
      uglify()
      .on('error',
        notify.onError(function (err) {
          s.end();
          return reportError(err);
        })
      )
    )
    .pipe(gulp.dest('static/js'))
    .pipe(notify({ message: 'Scripts task complete' }));

    return s;
});

gulp.task('images', function() {
  return gulp.src(paths.devImg)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.img))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('styles', function() {
  var c = gulp.src(paths.devSass)
    .pipe(
      sass({ style: 'compressed'})
      .on('error',
        notify.onError(function (err) {
          c.end();
          return reportError(err);
        })
      )
    )
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.css))
    .pipe(notify({ message: 'Styles task complete' }));

  return c;
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
