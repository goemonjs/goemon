var del = require('del'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    tslint = require('gulp-tslint');

var PRODUCT = JSON.parse(process.env.PROD_ENV || '0');

var targetPath = './built';

// Default task
gulp.task('default', function() {
  runSequence('develop');
});

// Task for development.
gulp.task('develop', function () {
  runSequence('build','start','watch');
});

// Start server and nodemon
gulp.task('nodemon', function(callback) {
  var called = false;

  return nodemon({
    script: './bin/www',
    ext: 'js html css ejs ico txt pdf json',
    ignore: ['src', 'node_modules']
  })
  .on('start', function() {
    if (!called) {
      called = true;
      callback();
    }
    console.log('nodemon started.');
  })
  .on('restart', function() {
    console.log('nodemon restarted.');
  });
});

// Setup browser-sync
gulp.task('start', ['nodemon'], ()=> {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 7000
  });
});

// Reload browser
gulp.task('browser-reload', function () {
  browserSync.reload();
});

// Build all
gulp.task('build', ['copy-assets', 'typescript', 'css', 'webpack', 'tslint'
 ] , function() {
});

// Rebuild task
gulp.task('rebuild', ['clean'], function() {
  runSequence('build');
});

// Copy nesesarry asserts to built folder
gulp.task('copy-assets', function () {
  gulp.src(
    ['src/public/**/', '!src/public/**/*.scss', 'src/views/**/' ],
    { base: './' }
  ).pipe(gulp.dest(targetPath));
});

// Build typescript task
gulp.task('typescript', shell.task(
  ['node ./node_modules/typescript/bin/tsc']
));

// Build css
gulp.task('css', function () {
  if ( PRODUCT =='production' ) {
  gulp.src('./src/public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./built/src/public/css'))
    .pipe(livereload());
  } else {
    gulp.src('./src/public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./built/src/public/css'))
    .pipe(livereload());
  }
});

// Pack javascript
gulp.task('webpack', function() {
  return gulp.src('built/src/app/view/**')
    .pipe(webpack(Object.assign({}, webpackConfig[0], {
    watch: false,
    })))
    .pipe(gulp.dest('built/src/public/js'))
    .pipe(browserSync.stream());
});

// Watch for rebuild
gulp.task('watch', function(){
  gulp.watch('./src/public/css/*.scss', ['css', 'browser-reload']);
  gulp.watch('./src/**', ()=> { return runSequence('build', 'browser-reload'); });
  gulp.watch('./test/**', ()=> { return runSequence('typescript', 'test'); });
});

gulp.task('uglify', function(){
  gulp.src('./src/public/js/*.js')
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(targetPath +'/public/js/'))
  ;
});

// Run jslint for lint javascript statements
gulp.task('jslint', ()=> {
  return gulp.src(['./src/**/*.js','./src/**/*.jsx'])
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// RUn tslint for lint typescript statements
gulp.task("tslint", () => {
    return gulp.src(['./src/**/*.ts','./src/**/*.tsx'])
    .pipe( tslint({ configuration: "tslint.json" }))
    .pipe(tslint.report())
});

// Clean up builted files
gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'built', 'coverage']));
