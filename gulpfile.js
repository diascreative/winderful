var gulp = require('gulp')
  , fs = require('fs')
  , path = require('path')
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
    css: 'www/static/css',
    sass: 'assets/sass',
    devSass: 'assets/sass/*.sass',
    devCssLibs: 'assets/sass/libs/*',
    devJsLibs: 'assets/scripts/libs/**/*.min.js',
    devJs: 'assets/scripts/*.js',
    devImg: 'assets/img/**/*',
    img: 'www/static/img',
    js: 'www/static/js',
    devThemes: 'assets/themes/',
    themes: 'www/static/themes/'
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
    .pipe(gulp.dest(paths.js));
});

gulp.task('scripts', function() {
  return scripts(paths.devJs, paths.js, 'app.js');
});

gulp.task('images', function() {
  return images(paths.devImg, paths.img);
});

gulp.task('styles', function() {
  return styles(paths.devSass, paths.css);
});

gulp.task('themes', function() {
  // create the folders for each theme
  var folders = getFolders(paths.devThemes);

  var tasks = folders.map(function(folder) {
      styles(paths.devThemes + '/' + folder + '/css/*.sass', paths.themes + folder + '/css/');
      scripts(paths.devThemes + '/' + folder + '/scripts/*.js', paths.themes + folder + '/js/', 'script.js');
      images(paths.devThemes + '/' + folder + '/img/**/*', paths.themes + folder + '/img');
   });
});

// Clean up static folder
gulp.task('clean', function(cb) {
  return gulp.src('./www/static/*', { read: false }) // much faster
    .pipe(rimraf())
    .pipe(notify({ message: 'Clean task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(paths.devJsLibs, ['libs']);
  gulp.watch(paths.devJs, ['scripts']);
  gulp.watch(paths.devImg, ['styles', 'images']);
  gulp.watch(paths.devSass, ['styles']);
  gulp.watch(paths.devCssLibs, ['styles']);
  gulp.watch(paths.devThemes, ['themes']);
});

// Default Task
gulp.task('default', function() {
  runSequence('clean', ['images', 'styles', 'watch', 'libs', 'scripts', 'themes']);
});

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

function scripts(origin, destination, name) {
  var s = gulp.src(origin)
    .pipe(gulpIgnore(paths.devJsLibs))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat(name))
    .pipe(
      uglify()
      .on('error',
        notify.onError(function (err) {
          s.end();
          return reportError(err);
        })
      )
    )
    .pipe(gulp.dest(destination))
    .pipe(notify({ message: 'Scripts task for ' + origin + ' complete' }));

  return s;
}

function styles(origin, destination) {
  var c = gulp.src(origin)
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
    .pipe(gulp.dest(destination))
    .pipe(notify({ message: 'Styles task from ' + origin + ' complete' }));

  return c;
}

function images(origin, destination) {
  return gulp.src(origin)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(destination))
    .pipe(notify({ message: 'Images task for ' + origin + ' complete' }));
}