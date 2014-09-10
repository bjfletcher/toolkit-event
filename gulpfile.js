'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var childProcess = require('child_process');
var runSequence = require('run-sequence');
var deploy = require("gulp-gh-pages");
var es6ModuleTranspiler = require("gulp-es6-module-transpiler");

var paths= {
    "deploy-remote": "origin",
    "deploy-branch": "gh-pages",
    "imagesSrc": "_images",
    "assets": "_site/assets",
    "jekyll": [
        "**/*.html",
        "**/*.md",
        "!_site/**/*.html",
        "!node_modules/**/*"
    ],
    js: 'src/js',
    sass: 'src/scss',
    "sass-demo": 'demo/scss',
    "compiled-js": '_site/js',
    "compiled-css": '_site/css'
};


gulp.task('sass-demo', function() {
    browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
    return gulp.src(paths["sass-demo"] + '/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: paths['compiled-css'],
            sass: paths["sass-demo"],
            bundle_exec: true,
            time: true
        }))
        .pipe(prefix("last 2 versions", "> 1%"))
        .pipe(gulp.dest(paths['compiled-css']))
        .pipe(browserSync.reload({stream:true}));
});


gulp.task('sass', function() {
    browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
    return gulp.src(paths["sass"] + '/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: paths['compiled-css'],
            sass: paths["sass"],
            bundle_exec: true,
            time: true
        }))
        .pipe(prefix("last 2 versions", "> 1%"))
        .pipe(gulp.dest(paths['compiled-css']))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
    gulp.src(paths.js + "/**/*.js")
        .pipe(es6ModuleTranspiler({
            type: "cjs"//amd
        }))
        .pipe(gulp.dest(paths['compiled-js']));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "_site"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.jekyll, ['jekyll-rebuild','sass','sass-demo', 'js']);
    gulp.watch(paths['compiled-js'] + '/**/*.js', ['js']);
    gulp.watch(paths.sass + '/**/*.scss', ['sass']);
    gulp.watch(paths['sass-demo'] + '/**/*.scss', ['sass-demo']);
});

gulp.task('jekyll-build', function (done) {
    return childProcess.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', function() {
    return runSequence(['jekyll-build'], function () {
        browserSync.reload();
    });
});

gulp.task('build', function(cb) {
    return runSequence('jekyll-build',['sass', 'sass-demo'], ['js'],
        cb
    );
});

gulp.task('gh-pages', function () {
    gulp.src("./_site/**/*")
        .pipe(deploy({
            cacheDir: '.tmp'
        })).pipe(gulp.dest('/tmp/gh-pages'));
});







/*                      */
/*  Main (public) Tasks */
/*                      */
gulp.task('serve', function(callback) {
    return runSequence(
        'build',
        ['browserSync', 'watch'],
        callback
    );
});

gulp.task('deploy', function(cb) {
    return runSequence(
        'build',
        'gh-pages',
        cb
    );
});
