import { Users } from '../models/user';
class UserService {

  public async isUserExist(userId: string) {
    return await Users.isUserExist(userId);
  }

  public async isValidUser(userId: string) {
    return true;
  }

  public async authenticate(userId: string, password: string) {
    try {
      let userDocument = await Users.authenticate(userId, password );
      if ( userDocument != null ) {
        return {
          id: userDocument.id,
          email: userDocument.email.toString()
        };
      } else {
        return undefined;
      }
    } catch ( err ) {
      return undefined;
    }
  }

  public async findById(id: string) {
    let userDocument = await Users.findById(id).exec();
    if ( userDocument != null ) {
      return {
        email: userDocument.email.toString()
      };
    } else {
      throw new Error(`Can not find user ${id}`);
    }
  }
}

export default new UserService();
