import UserService from '../../../services/user-service';
import PassportUtility from '../passport-utility';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

module.exports = (app) => {
  enableBasicStrategy();
};

function enableBasicStrategy() {
  passport.use(new BasicStrategy(
    function (userid, password, done) {
      UserService.authenticate(userid, PassportUtility.getHash(password), (result) => {
        if ( result ) {
          UserService.findById(userid, (user) => {
            return done(null, user);
          });
        } else {
          return done('error', null);
        }
      });
    }
  ));
}
