var gulp = require('gulp');
var del = require('del');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  return sass('public/stylesheets/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist/'));
  });

gulp.task('clean', function(cb) {
    del(['public/dist'], cb);
});

gulp.task('js', function() {
  gulp.src(["public/javascripts/config.js", "public/javascripts/controllers/mainCtrl.js", "public/javascripts/services/service.js"])
  .pipe(concat("bundle.js"))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest("public/dist/"));
});

gulp.task('watch', function () {
    gulp.watch('public/stylesheets/style.scss', ['styles']);
    gulp.watch('public/javascripts/controllers/*.js', ['js']);
    gulp.watch('public/javascripts/services/*.js', ['js']);
});
// gulp.task('watch', function () {
//     return watch('public/stylesheets/style.scss', function() {
//           gulp.start('styles', 'reload');
//         });
// });
gulp.task("nodemon", function() { nodemon(); });

gulp.task('default', ['nodemon', 'js', 'styles', 'watch']);
