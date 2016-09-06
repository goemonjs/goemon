import UserController from '../../../controllers/user-controller';
import PassportUtility from '../passport-utility';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  enableLocalStrategy();
};

function enableLocalStrategy() {
  passport.use(new LocalStrategy({
      usernameField: 'userid',
      passwordField: 'password',
      passReqToCallback: true
    }, function (req, userid, password, done) {
        UserController.authenticate(userid, PassportUtility.getHash(password), (result) => {
          if ( result ) {
            UserController.findById(userid, (user) => {
              return done(null, user);
            });
          } else {
            return done(null, false, { message: 'Failed to login.' });
          }
      });
    }
  ));
}
