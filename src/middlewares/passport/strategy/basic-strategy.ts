import UserService from '../../../services/user-service';
import PassportUtility from '../passport-utility';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = (app) => {
  enableBasicStrategy();
};

async function enableBasicStrategy() {
  passport.use(new BasicStrategy(
    async (userid, password, done) => {
      let result = await UserService.authenticate(userid, password);
      if ( result ) {
        let user = await UserService.findById(userid);
        return done(undefined, user);
        } else {
        return done('error', undefined);
      }
    }
  ));
}
