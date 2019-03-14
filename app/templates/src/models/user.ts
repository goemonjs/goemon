// import mongoose = require('mongoose');
// import Schema = mongoose.Schema;
// import Model = mongoose.Model;
// import Document = mongoose.Document;
// import PassportUtility from '../middlewares/passport/passport-utility';

// // Define Document properties
// export interface UserDocument extends Document {
//   email: String;
//   password: String;
//   verifyEmail: Boolean;
//   validation: {
//     emailConfirmKey: String;
//   };
//   profile: {
//     image: any;
//     firstName: String;
//     middleName: String;
//     lastName: String;
//     birthDay: Date;
//   };
//   createDate: Date;
//   updateDate: Date;
// }

// // Define static methods for Model
// interface IUserModel extends Model<UserDocument> {
//   new (doc?: Object): UserDocument;

//   // Definitions of static methods
//   authenticate(userId: String, password: String): Promise<{user: UserDocument, error: Error}>;
//   createUser(userId: String, password: String): Promise<UserDocument>;
//   isUserExist(userId: String): Promise<boolean>;
// }

// function createModel(): IUserModel {
//   // Define mongoose Schema
//   let userSchema: Schema = new Schema({
//     email: { type: String, index: { unique: true }},
//     password: { type: String, index: { required : true }},
//     validation: {
//       emailVerified: { type: Boolean, default: false },
//       emailConfirmKey: String
//     },
//     profile: {
//       image: { data: Buffer, contentType: String },
//       firstName: String,
//       middleName: String,
//       lastName: String,
//       birthDay: Date
//     },
//     createDate: { type: Date, default: new Date() },
//     updateDate: { type: Date, default: new Date() }
//   });

//   // Create mongoose Object with IUserModel and UserDocument
//   let User = <IUserModel>mongoose.model('User', userSchema);

//   // Return Model
//   return User;
// }

// export const User: IUserModel = createModel();

// //  Implementation of static method for Model
// class UserModel {

//   //
//   // Implimentation of static methods
//   //
//   public static authenticate(email: String, password: String): Promise<{user: UserDocument, error: Error}> {

//     return new Promise( (resolve, reject) => {
//       User.findOne({ email: email }).exec().then( (user) => {
//         if ( user != null && ( user.password === PassportUtility.getHash(password) ) ) {
//           resolve({
//             user: user
//           });
//         } else {
//           resolve({
//             error: new Error('ID or Password is incollect.')
//           });
//       }
//       }).catch( ( error:any ) => {
//         reject(error);
//       });
//     });

//   };

//   public static createUser(email: String, password: String): Promise<UserDocument> {
//     return new Promise( (resolve, reject) => {
//       let user = new User();
//       user.email = email;
//       user.password = PassportUtility.getHash(password);
//       user.profile.firstName = '-';
//       user.profile.lastName = '-';

//       user.save().then( (result) => {
//         resolve(result);
//       }).catch( (error:any) => {
//         reject(error);
//       });
//     });
//   }

//   public static isUserExist(email:String): Promise<boolean> {
//     return new Promise( (resolve, reject) => {
//        User.findOne({ email : email } ).count().then((res:number) => {
//          if ( res > 0 ) {
//            resolve(true);
//          } else {
//            resolve(false);
//          }
//        }).catch( (error:any) => {
//          reject(error);
//        });
//     });
//   }
// }

// // Needs to append implementation of static interface here
// User.authenticate = UserModel.authenticate;
// User.createUser = UserModel.createUser;
// User.isUserExist = UserModel.isUserExist;
