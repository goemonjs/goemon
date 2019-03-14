import UserService from '../../../services/user-service';
import PassportUtility from '../passport-utility';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  enableLocalStrategy();
};

function enableLocalStrategy() {
  passport.use(new LocalStrategy({
      usernameField: 'userid',
      passwordField: 'password',
      passReqToCallback: true
    }, function (req, userid, password, done) {
      UserService.authenticate(userid, PassportUtility.getHash(password), (result) => {
          if ( result ) {
            UserService.findById(userid, (user) => {
              return done(undefined, user);
            });
          } else {
            return done(undefined, false, { message: 'Failed to login.' });
          }
      });
    }
  ));
}
