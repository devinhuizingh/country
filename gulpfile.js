var gulp = require('gulp');

var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var mainBowerFiles = require('main-bower-files')
// Minify index
//gulp.task('html', function() {
//  return gulp.src('app/**/*.html')
//    .pipe(concat('index.html'))
//    .pipe(minifyHTML())
//    .pipe(gulp.dest('build/'));
//});

gulp.task('usemin', [ 'copy' ], function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
//vendor files
gulp.task('vendor', function() { 
  return gulp.src(mainBowerFiles(), {base: 'bower_components'}) 
    .pipe(concat('vendor.js')) 
    .pipe(gulp.dest('build/js'));
});


// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('app/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});
gulp.task('clean', function(){
  gulp.src( './build/', { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src(['./app/**/*.html'], {base: './app'})
  .pipe(gulp.dest('build/'));
});


// Image optimization task
gulp.task('images', function() {
  return gulp.src('app/sunset.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('build/'));
});



// Default task
gulp.task('default', []);

// Build task
gulp.task('build', ['copy', 'scripts', 'styles', 'images']);