import * as crypto from 'crypto';

class PassportUtility {

  public getUserId(req:any):string {
    return req.session.passport.user.userid;
  }

  public getUserName(req:any):string {
    return req.session.passport.user.name;
  }

  public getHash(target:string):string {
    var sha512 = crypto.createHash('sha512');
    sha512.update(target);
    return sha512.digest('hex');
  }
}

export default new PassportUtility();
