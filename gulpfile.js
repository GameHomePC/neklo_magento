var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var googleWebFonts = require('gulp-google-webfonts');
var browserSync = require('browser-sync').create();

var conf = {
    sass: {
        watch: './sass/**/*.scss',
        rubySass: 'sass/',
        css: 'css',
        map: './'
    },
    templatesPath: '**/*.html',
    fonts: {
        dirFonts: './fonts',
        listFonts: './*.list'
    },
    dirJS: './**/*.js'
};

// ==============
// google-fonts
// ==============
gulp.task('google-fonts', function () {
    gulp.src(conf.fonts.listFonts)
        .pipe(googleWebFonts())
        .pipe(gulp.dest(conf.fonts.dirFonts))
});

// ==============
// dev-sass
// ==============
gulp.task('dev-sass', function () {
    return rubySass(conf.sass.rubySass, { compass: true, sourcemap: false })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 30 version', '> 1%', 'ie 7-10'))
        .pipe(gulp.dest(conf.sass.css))
        .pipe(browserSync.reload({stream: true}));
});

// ==============
// browser-sync
// ==============
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 9000
    });
});

// ==============
// watch
// ==============
gulp.task('watch', function() {
    gulp.watch(conf.templatesPath).on('change', browserSync.reload);
    gulp.watch(conf.dirJS).on('change', browserSync.reload);
    gulp.watch(conf.sass.watch, ['dev-sass']);
    gulp.watch(conf.fonts.listFonts, ['google-fonts']);
});

// ==============
// default
// ==============
gulp.task('default', ['google-fonts', 'browser-sync', 'dev-sass', 'watch']);