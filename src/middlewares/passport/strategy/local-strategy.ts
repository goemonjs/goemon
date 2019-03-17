import UserService from '../../../services/user-service';
import { IUser } from '../../../objects/user';

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
    }, async function (req, userid, password, done) {
      let isSuccess = await UserService.authenticate(userid, password);
        if ( isSuccess ) {
          let user: IUser = await UserService.findById(userid);
          return done(undefined, user);
        } else {
          return done(undefined, false, { message: 'Failed to login.' });
        }
    })
  );
}
