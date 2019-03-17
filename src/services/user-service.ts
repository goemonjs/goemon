import { Users } from '../models/user';
class UserService {

  public async isUserExist(userId: string) {
    return await Users.isUserExist(userId);
  }

  public async isValidUser(userId: string) {
    return true;
  }

  public async authenticate(userId: string, password: string) {
    return true;
    // return await Users.authenticate(userId, password );
  }

  public async findById(userId: string) {
    let userDocument = await Users.findById(userId).exec();
    if ( userDocument != null ) {
      return {
        email: userDocument.email.toString()
      };
    } else {
      throw new Error(`Can not find user ${userId}`);
    }
  }
}

export default new UserService();
