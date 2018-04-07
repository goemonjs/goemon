import * as express from 'express';
import * as fs from 'fs';
import PassportUtility from '../middlewares/passport/passport-utility';
let passport = require('passport');

let router = express.Router();
let jsDate:number = 0;

module.exports = function (app) {
  app.use('/auth', router);
};

router.get('/login', function (req:any, res:any, next:any) {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local',
  { successRedirect: '/auth', failureRedirect: '/auth/login', failureFlash: true }
));

router.get('/logout', function(req:any, res:any) {
  req.logout();
  res.redirect('/auth');
});

router.get('/', isAuthenticated, function (req:any, res, next) {
  let path = require('path');
  let rootPath = path.normalize(__dirname + '/..');

  // Calc js modify date
  var jsStats = fs.statSync(rootPath + '/public/js/redux-sample.js');
  jsDate = jsStats.mtime.getFullYear() + jsStats.mtime.getMonth() + jsStats.mtime.getDay() + jsStats.mtime.getTime();

  res.render('member', {
    userid: PassportUtility.getUserId(req),
    jsDate: jsDate
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}
