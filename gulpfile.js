const gulp = require('gulp');
const less = require('gulp-less');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// Копирование картинок и других ассетов
// encoding: false — обязательно для Gulp 5, иначе бинарные файлы портятся
gulp.task('assets', function() {
    return gulp.src('src/assets/**/*', { encoding: false })
        .pipe(gulp.dest('dist/assets/'))
        .pipe(browserSync.stream());
});

// Компиляция LESS
gulp.task('less', function() {
    return gulp.src('src/styles/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.stream());
});

// Сборка HTML
gulp.task('html', function() {
    return gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html/'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

// Сервер + слежение за изменениями
gulp.task('serve', gulp.series('assets', 'less', 'html', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        port: 3000,
        open: true,
        notify: false
    });

    gulp.watch('src/styles/**/*.less', gulp.series('less'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
    gulp.watch('src/assets/**/*', gulp.series('assets'));
}));

// Полная сборка
gulp.task('build', gulp.series('assets', 'less', 'html'));

// По умолчанию — сборка и запуск сервера
gulp.task('default', gulp.series('build', 'serve'));