import UserService from '../../../services/user-service';
import PassportUtility from '../passport-utility';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = (app) => {
  enableBasicStrategy();
};

function enableBasicStrategy() {
  passport.use(new BasicStrategy(
    function (userid, password, done) {
      UserService.authenticate(userid, PassportUtility.getHash(password), (result) => {
        if ( result ) {
          UserService.findById(userid, (user) => {
            return done(undefined, user);
          });
        } else {
          return done('error', undefined);
        }
      });
    }
  ));
}
