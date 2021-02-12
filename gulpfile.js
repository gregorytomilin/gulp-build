const { src, dest, task, series, watch } = require("gulp");
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');


task('sass', function () {
    return src('dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(dest('dist/css'));
});





task('script', () =>
    src('dev/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(dest('dist/js'))
);
task('html', () =>
    src('dev/**/*.html')
        .pipe(dest('dist/'))
);


task('watch', function () {
     watch(['dev/scss/**/*.scss'], series('sass'));
     watch(['dev/js/*.js'], series('script'));
     watch(['dev/**/*.html'], series('html'));

});