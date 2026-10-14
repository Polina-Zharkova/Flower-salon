const gulp = require('gulp');
const less = require('gulp-less');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task('assets', function() {
    return gulp.src('src/assets/**/*', { encoding: false })
        .pipe(gulp.dest('dist/assets/'))
        .pipe(browserSync.stream());
});


gulp.task('less', function() {
    return gulp.src('src/styles/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.stream());
});


gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});


gulp.task('html', function() {
    return gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html/'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});


gulp.task('serve', gulp.series('assets', 'less', 'js', 'html', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        port: 3000,
        open: true,
        notify: false
    });

    gulp.watch('src/styles/**/*.less', gulp.series('less'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
    gulp.watch('src/assets/**/*', gulp.series('assets'));
}));

gulp.task('build', gulp.series('assets', 'less', 'js', 'html'));

gulp.task('default', gulp.series('build', 'serve'));