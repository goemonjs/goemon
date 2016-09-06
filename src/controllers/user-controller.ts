import PassportUtility from '../auth/passport/passport-utility';

class UserController {

  public isUserExist(userid:string, callback:any) {
    callback(true);
  }

  public isValidUser(userId:string, callback:any) {
    callback(true);
  }

  public authenticate(userId:string, password:string, callback:any) {
    if ( userId == 'test@example.com' && password == PassportUtility.getHash('test') ) {
      callback(true);
    } else {
      callback(false);
    }
  }

  public findById(userId:string, callback:any) {
    callback({
      id : 1,
      userid: 'test@example.com',
      username: 'Test User'
    });
  }
}

export default new UserController();
