import { Users } from '../models/user';
import { verifyJWTToken } from '../base/utilities/jwt';

class UserService {

  public async isUserExist(userId: string) {
    return await Users.isUserExist(userId);
  }

  public async isValidUser(userId: string) {
    return true;
  }

  public async authenticate(userId: string, password: string) {
    try {
      let userDocument = await Users.authenticate(userId, password);
      if (userDocument != null) {
        return {
          id: userDocument.id,
          email: userDocument.email.toString(),
          displayName: userDocument.profile.firstName + ' ' + userDocument.profile.lastName,
          roles: userDocument.roles
        };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  public async findById(id: string) {
    let userDocument = await Users.findById(id).exec();
    if (userDocument != null) {
      return {
        email: userDocument.email.toString()
      };
    } else {
      throw new Error(`Can not find user ${id}`);
    }
  }

  public async getUserFromJWTToken(token: string) {
    const userData = await verifyJWTToken(token);
    const email = userData.email;
    let userDocument = await Users.findOne({ email: email }).exec();

    if (!userDocument) {
      return null;
    }

    return userDocument;
  }
}

export default new UserService();
