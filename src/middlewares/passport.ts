import express from 'express';
import passport from 'passport';
import glob from 'glob';
import path from 'path';

module.exports = (app: express.Express) => {
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  enableSessionSelialization();

  // Load strategies
  let strategiesPath = path.normalize(__dirname + '/passport/strategy');
  let auth = glob.sync(strategiesPath + '/*.+(js|ts|jsx|tsx)');
  auth.forEach(function (routes) {
    require(routes)(app);
  });
};

function enableSessionSelialization() {
  passport.serializeUser( (user: any, callback: any) => {
    callback(undefined, user);
  });
  passport.deserializeUser( (obj: any, callback: any) => {
    callback(undefined, obj);
  });
}
