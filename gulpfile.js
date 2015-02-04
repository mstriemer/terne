var gulp = require('gulp');
var to5 = require('gulp-6to5');
var connect = require('gulp-connect');
var rename = require("gulp-rename");

var to5Files = ['**/*.es6.js'];
var otherFiles = ['sample/**/*.html', 'sample/**/*.css'];

function run6to5(files) {
    return gulp.src(files)
        .pipe(rename(function(path) {
            path.basename = path.basename.replace('.es6', '');
        }))
        .pipe(to5())
        .pipe(gulp.dest('dist'));
}

gulp.task('6to5', function() {
    return run6to5(to5Files);
});

gulp.task('watch-6to5', function() {
    return gulp.watch(to5Files, ['6to5']);
});

gulp.task('copy', function() {
    return gulp.src(otherFiles)
        .pipe(gulp.dest('dist/sample'));
});

gulp.task('watch-copy', function() {
    return gulp.watch(otherFiles, ['copy']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
    });
});

gulp.task('dev', ['6to5', 'copy', 'connect', 'watch-6to5', 'watch-copy']);
