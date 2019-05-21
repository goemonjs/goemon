import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

import { Users, UserDocument } from '../../../../../models/user';
import { User as GUser } from '../gtypes';
import { Profile } from '../gtypes';

export default {
  Query: {
    getProfile: getProfile,
  },
};

async function getProfile(parent: any, args: any, context: { me: GUser }, info: any) {
  const condition = { email: context.me.email };
  let user: UserDocument | null = await Users.findOne(condition).exec();
  if (user == null) {
    throw new ApolloError('User does not exist.');
  }
  let profile: Profile = {
    email: user.email,
    displayName: user.displayName,
    isEmailVeried: user.isEmailVerified,
    image: user.profile.image,
    firstName: user.profile.firstName,
    middleName: user.profile.middleName,
    lastName: user.profile.lastName,
    birthDay: user.profile.birthDay && user.profile.birthDay.toISOString(),
    createdAt: user.createdAt && user.createdAt.toISOString(),
    updatedAt: user.updatedAt && user.updatedAt.toISOString()
  };
  return profile;
}
