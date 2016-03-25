var gulp         = require('gulp');
var conn         = require('gulp-connect');
var concat       = require('gulp-concat');
var minifyCSS    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var jpegtran     = require('imagemin-jpegtran');
var del          = require('del');
var livereload   = require('gulp-livereload');

gulp.task('clean', function(cb) {
    del(['build/'], cb);
});

gulp.task('css', function() {
    return gulp.src('css/**/*.css')
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            multipass: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['clean', 'css', 'scripts', 'images'], function() {
    livereload();
});

gulp.task('serve', function() {
    conn.server({
        root: '.',
        port: 3003,
        fallback: 'index.html'
    });
});

gulp.task('dev', ['build', 'serve'], function() {
    livereload.listen();
    gulp.wtch(['js/**/*', '*.js', 'css/**/*.css', 'ing/**/*'], ['default']);
});

gulp.task('default', ['build']);
