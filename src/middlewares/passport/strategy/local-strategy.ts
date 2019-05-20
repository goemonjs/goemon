import passport from 'passport';
import passportLocal from 'passport-local';
import { logger } from '../../../base/utilities/logger';

import UserService from '../../../services/user-service';

const LocalStrategy = passportLocal.Strategy;

module.exports = (app) => {
  enableLocalStrategy();
};

function enableLocalStrategy() {
  passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true
  }, async function (req, userid, password, done) {
    try {
      let user = await UserService.authenticate(userid, password);
      if (user != undefined) {
        return done(undefined, user);
      } else {
        return done(undefined, false, { message: 'Failed to login.' });
      }
    } catch (err) {
      logger.error(err);
    }
  }));
}
