'use strict';

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
var rimraf = require('gulp-rimraf');
var gulpIgnore = require('gulp-ignore');
var assets = {
    sass: 'assets/sass/*.sass',
    cssLibs: 'assets/sass/libs/*',
    jsLibs: 'assets/scripts/libs/**/*.min.js',
    js: 'assets/scripts/*.js',
    img: 'assets/img/**/*',
    themes: 'assets/themes/'
  };

var dist = {
    css: 'www/static/css',
    img: 'www/static/img',
    js: 'www/static/js',
    themes: 'www/static/themes/'
  };

var reportError = function(err) {
    if (typeof err.fileName !== 'undefined') {
      return '\n' + err.fileName + ': line ' + err.lineNumber + ', ' + err.message;
    } else {
      return err;
    }
  };

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

function scripts(origin, destination, name) {
  var s = gulp.src(origin)
    .pipe(gulpIgnore(assets.jsLibs))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat(name))
    .pipe(
      uglify()
      .on('error',
        notify.onError(function(err) {
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
      sass({ style: 'compressed', 'sourcemap=none': true, loadPath: 'assets/sass/' })
      .on('error',
        notify.onError(function(err) {
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

gulp.task('libs', function() {
  return gulp.src(assets.jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('scripts', function() {
  return scripts(assets.js, dist.js, 'app.js');
});

gulp.task('images', function() {
  return images(assets.img, dist.img);
});

gulp.task('styles', function() {
  return styles(assets.sass, dist.css);
});

gulp.task('themes', function() {
  // create the folders for each theme
  var folders = getFolders(assets.themes);

  folders.map(function(folder) {
    styles(assets.themes + folder + '/css/*.sass', dist.themes + folder + '/css/');
    scripts(assets.themes + folder + '/scripts/**/*.js', dist.themes + folder + '/js/', 'script.js');
    images(assets.themes + folder + '/img/**/*', dist.themes + folder + '/img');
  });
});

// Clean up static folder
gulp.task('clean', function() {
  return gulp.src('./www/static/*', { read: false })

 // much faster
    .pipe(rimraf())
    .pipe(notify({ message: 'Clean task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(assets.jsLibs, ['libs']);
  gulp.watch(assets.js, ['scripts']);
  gulp.watch(assets.img, ['styles', 'images']);
  gulp.watch(assets.sass, ['styles']);
  gulp.watch(assets.cssLibs, ['styles']);
  gulp.watch(assets.themes + '**', ['themes']);
});

// Default Task
gulp.task('default', function() {
  runSequence('clean', ['images', 'styles', 'watch', 'libs', 'scripts', 'themes']);
});
