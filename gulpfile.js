var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    browser = require('browser-sync'),
    run = require('run-sequence'),
    del = require('del');

gulp.task('styles', function() {
  return sass('public/stylesheets/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/stylesheets/css/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets/css/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('default', function() {
    gulp.start('styles', 'watch');
});

gulp.task('clean', function(cb) {
    del(['public/stylesheets/css/css'], cb);
});

gulp.task('reload', function(){
  browser.reload();
});

gulp.task('watch', function () {
    return watch('public/stylesheets/style.scss', function() {
          gulp.start('styles', 'reload');
        });
});
