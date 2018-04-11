import * as express from 'express';
let domain = require('domain');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let passport = require('passport');
let expressValidator = require('express-validator');
let glob = require('glob');
let flash = require('connect-flash');

const CACHE_TIMEOUT = 60000;  // ms

import Config from './config/config';

class AppServer {

  public app: any; //express app
  public config: Config;

  constructor() {
  }

  // start express application
  public initalize(app: any, config: Config) {
    this.app = app;
    this.config = config;

    // view engine setup
    app.set('views', path.join(config.root, 'views'));
    app.set('view engine', 'ejs');

    // validator
    app.use(expressValidator());

    // favicon
    app.use(favicon(path.join(config.root, '.', 'public', 'favicon.ico'))); // uncomment after placing your favicon in /public

    // logger
    app.use(logger('dev'));

    // bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // cookieParser
    app.use(cookieParser());

    // session
    app.use(session({
          secret: config.Session.Secret,
          resave: config.Session.Resave,
          saveUninitialized: config.Session.SaveUninitialized,
          cookie: { maxAge: config.Session.Cookie.MaxAge }
    }));

    // public folder path
    const cacheTime = 10000;     // 10s
    app.use(express.static(path.join(config.root, '.', 'public'), {
      maxAge: cacheTime,
      lastModified: true,
      redirect: true }
      ));

    // Sample cache of extension match
    // app.use(function (req, res, next) {
    //     if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
    //         res.setHeader('Cache-Control', 'public, max-age=3600');
    //     }
    //     next();
    // });

    // Initialize connect-flash
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    // Setup auth
    let auth = glob.sync(config.root + '/middlewares/*.js');
    auth.forEach(function (routes) {
      require(routes)(app);
    });

    // Setup routes
    let routes = glob.sync(config.root + '/routes/*.js');
        routes.forEach(function (routes) {
            require(routes)(app);
        });

    // Comment out if you want to specify root files directly
    // require(config.root + '/routes/index.js')(app);
    // require(config.root + '/routes/api.js')(app);
    // require(config.root + '/routes/redux.js')(app);
    // require(config.root + '/routes/simple.js')(app);
    // require(config.root + '/routes/about.js')(app);
    // require(config.root + '/routes/auth.js')(app);

    // catch 404 and forward to error handler
    app.use((req: any, res: any, next: any) => {
      let err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
  }

  public start(callback) {
    this.app.listen(this.config.port, () => {
      callback('Express server listening on port ' + this.config.port);
    });
  }
}

export default new AppServer();
