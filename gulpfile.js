var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var googleWebFonts = require('gulp-google-webfonts');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var conf = {
    sass: {
        watch: './sass/**/*.scss',
        rubySass: './sass/',
        css: './css',
        map: './'
    },
    templatesPath: './*.php',
    fonts: {
        dirFonts: './fonts',
        listFonts: './*.list'
    },
    dirJS: './js/*.js'
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
    return rubySass(conf.sass.rubySass, { compass: true, sourcemap: false, style: 'compressed' })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 30 version', '> 1%', 'ie 7-10'))
        .pipe(gulp.dest(conf.sass.css))
        .pipe(browserSync.reload({stream: true}));
});

// ==============
// scripts
// ==============
gulp.task('scripts', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js/build/'));
});

// ==============
// browser-sync
// ==============
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'neklo-magento.loc',
        port: 1515,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        open: false
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
// watch
// ==============
gulp.task('imagesMin', function () {
    return gulp.src('imagesOrigin/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});

// ==============
// build
// ==============
gulp.task('build', ['imagesMin']);

// ==============
// default
// ==============
gulp.task('default', ['google-fonts', 'browser-sync', 'dev-sass', 'watch', 'scripts']);