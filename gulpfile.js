/* 
 * gulpfile.js - Environment settings, task definition for app.js
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({
        script: 'index.js',
        ext: 'js',
        env: {
            PORT: 8888
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting server at port ');
    });
});
