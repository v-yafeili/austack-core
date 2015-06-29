'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var ngConstant = require('gulp-ng-constant');

module.exports = function (options) {
  gulp.task('config', function () {
    var env = options.env || 'development';
    gulp.src(options.src + '/app/config/env-' + env + '.json')
      .pipe($.ngConstant({
        name: 'austackApp.config',
        templatePath: options.src + '/app/config/config.tpl.ejs',
        deps: []
      }))
      .pipe($.rename(options.src + '/app/config.js'))
      .pipe(gulp.dest(''));
  });
};