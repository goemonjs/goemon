var del = require('del'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync').create(),
    notifier = require('node-notifier'),
    eslint = require('gulp-eslint'),
    tslint = require('gulp-tslint');

  var tslintconfig = require('./tslint.json');

var PRODUCT = JSON.parse(process.env.PROD_ENV || '0');

var PRODUCT = JSON.parse(process.env.PROD_ENV || '0');
var targetPath = './built';
var exec = require('child_process').exec;

// Default task
gulp.task('default', function() {
  runSequence('develop');
});

// Build typescript files using native tsc compiler
gulp.task('tsc', function (cb) {
  return exec('node ./node_modules/typescript/bin/tsc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Task for development.
gulp.task('develop', ['copy-assets', 'tsc', 'css', 'lint'], function () {
  return runSequence('watch', 'start', 'webpack');
});

// Start server and nodemon
gulp.task('nodemon', (callback) => {
  var called = false;

  return nodemon({
    verbose:false,
    script: './bin/www',
    delay: "2500",
    ext: 'js html css ejs ico txt pdf json',
    ignore: [
      'built/src/client/*',
      'built/src/public/*',
      'built/test/*',
      '*.ts',
      '*.tsx',
      '*.json',
      'node_modules']
  })
  .on('start', () => {
    if (!called) {
      called = true;
      setTimeout( () => {
        browserSync.init(null, {
          proxy: 'http://localhost:3000',
          port: 7000
        });
      }, 4000);
      callback();
    }
    console.log('nodemon started.');


  })
  .on('restart', () => {
    console.log('nodemon restarting...');
    // サーバー再起動時
    setTimeout( () => {
        browserSync.reload();
    }, 3000);
  });
});

// Setup browser-sync
gulp.task('start', ['nodemon'], () => {

});

// Reload browser
gulp.task('browser-reload', () => {
  return browserSync.reload();
});

// Build all
gulp.task('build', ['copy-assets', 'tsc', 'css', 'lint'] , () => {
  return runSequence('webpack');
});

// Rebuild task
gulp.task('rebuild', ['clean'], () => {
  runSequence('copy-assets', 'tsc', 'css', 'lint', 'webpack-release');
});

// Copy nesesarry asserts to built folder
gulp.task('copy-assets', () => {
  gulp.src(
    ['src/public/**/', '!src/public/**/*.scss', 'src/views/**/', 'config/**/' ],
    { base: './src' }
  ).pipe(gulp.dest(targetPath));
});

// Build css
gulp.task('css', () => {
  if ( PRODUCT =='production' ) {
  gulp.src('./src/public/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./built/src/public/css'))
    .pipe(livereload());
  } else {
    gulp.src('./src/public/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./built/src/public/css'))
    .pipe(livereload());
  }
});

// Pack javascript
gulp.task('webpack', () => {
  return gulp.src('built/src/app/view/**')
    .pipe(plumber({errorHandler:function(error) {
        notifier.notify({
            message: error.message,
            title: error.plugin,
            sound: 'Glass'
        });
    }}))
    .pipe(webpack(Object.assign({}, webpackConfig[0], {
      watch: true
    })))
    .pipe(gulp.dest('built/src/public/js'))
    .pipe(browserSync.stream());
});

// Watch for rebuild
gulp.task('watch', () => {
  gulp.watch('./src/public/css/*.scss', ['css', 'browser-reload'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
  });

  gulp.watch(['./src/**', '!./src/client/**/*', '!./src/public/css/*'], ()=> { return runSequence('tsc', 'copy-assets');})
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
  });

  gulp.watch('./test/**', ()=> { return runSequence( 'tsc', 'test-withtimelag'); })
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

// Run test
// gulp.task('test', () => {
//   gulp.src(targetPath + '/test/**/*.js', { read: false })
//     .pipe(plumber({errorHandler:function(error) {
//         notifier.notify({
//             message: error.message,
//             title: error.plugin,
//             sound: 'Glass'
//         });
//     }}))
//     .pipe(mocha({ reporter: "spec", timeout: "5000" }));
//     // .on("error", (err) => {
//     //   console.log(err.toString());
//     //   this.emit('end');
//     // });
// });

// gulp.task('watch-test', function(){
//   return gulp.watch('./test/**', ()=> { return runSequence('tsc', 'test'); })
//     .on('change', function(event) {
//       console.log('File ' + event.path + ' was ' + event.type);
//     });
// });

// uglify javascript files
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

// Linting
gulp.task("lint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint(tslintconfig))
        .pipe(tslint.report())
);

// Clean up builted files
gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'built', 'coverage']));
