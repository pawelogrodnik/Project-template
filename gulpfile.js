var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlPartial = require('gulp-html-partial');

gulp.task('Reload Serwera', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('Buduję stronę..', function () {
    gulp.src(['*.html'])
        .pipe(htmlPartial({
            basePath: 'components/'
        }))
        .pipe(gulp.dest('build/pages'));
});

gulp.task('Sklejam CSS', function() {
    gulp.src('scss/style.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['>0%'] }))
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('Aktualizuję pliki', function() {
    gulp.watch('scss/*.scss', ['Sklejam CSS']);
    gulp.watch('scss/partials/*.scss', ['Sklejam CSS']);
    gulp.watch('*.html', ['Buduję stronę..'])
})

gulp.task('default', ['Sklejam CSS', 'Reload Serwera', 'Aktualizuję pliki', 'Buduję stronę..']);
