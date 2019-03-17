import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Model = mongoose.Model;
import Document = mongoose.Document;
import * as crypto from 'crypto';

// Define Document properties
export interface UserDocument extends Document {
  email: String;
  password: String;
  verifyEmail: Boolean;
  validation: {
    emailConfirmKey: String;
  };
  profile: {
    image: any;
    firstName: String;
    middleName: String;
    lastName: String;
    birthDay: Date;
  };
  createDate: Date;
  updateDate: Date;
}

// Define static methods for Model
interface IUserModel extends Model<UserDocument> {
  new (doc?: Object): UserDocument;

  // Definitions of static methods
  authenticate(userId: string, password: string): Promise<UserDocument>;
  createUser(userId: string, password: string): Promise<UserDocument>;
  isUserExist(userId: string): Promise<boolean>;
}

function createModel(): IUserModel {
  // Define mongoose Schema
  let userSchema: Schema = new Schema({
    email: { type: String, index: { unique: true }},
    password: { type: String, required : true },
    validation: {
      emailVerified: { type: Boolean, default: false },
      emailConfirmKey: String
    },
    profile: {
      image: { data: Buffer, contentType: String },
      firstName: String,
      middleName: String,
      lastName: String,
      birthDay: Date
    },
    createDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
  });

  // Create mongoose Object with IUserModel and UserDocument
  let User = <IUserModel>mongoose.model('User', userSchema);

  // Return Model
  return User;
}

export const Users: IUserModel = createModel();

//  Implementation of static method for Model
class UserModel {

  //
  // Implimentation of static methods
  //
  public static async authenticate(email: string, password: string) {
    let user = await Users.findOne({ email: email }).exec();
    if ( user != null && ( user.password === UserModel.getHash(password) ) ) {
      return user;
    } else {
      throw new Error('Password does not match.');
    }
  }

  public static async createUser(email: string, password: string): Promise<UserDocument> {
    let user = new Users();
    user.email = email;
    user.password = UserModel.getHash(password);
    user.profile.firstName = '-';
    user.profile.lastName = '-';

    return await user.save();
  }

  public static async isUserExist(email: string) {
    let result = await Users.findOne({ email : email } ).countDocuments();
    if ( result > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  public static getHash(target: string): string {
    let sha512 = crypto.createHash('sha512');
    sha512.update(target);
    return sha512.digest('hex');
  }
}

// Needs to append implementation of static interface here
Users.authenticate = UserModel.authenticate;
Users.createUser = UserModel.createUser;
Users.isUserExist = UserModel.isUserExist;
