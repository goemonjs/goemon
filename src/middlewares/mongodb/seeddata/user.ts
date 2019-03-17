/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { ISeedCreator } from '../../../base/objects/types';
import { Users } from '../../../models/user';
import PassportUtility from '../../../middlewares/passport/passport-utility';

module.exports = async (app) => {
  if (!app) {
    // for test
    return creator;
  }

  let result = await creator.isDataExist();
  if (!result) {
    creator.createSeed();
  }
  return null;
};

const creator: ISeedCreator = {

  async isDataExist(): Promise<boolean> {
    return Users.isUserExist('test1');
  },

  async createSeed() {
    // Users.createUser('test@example.com', PassportUtility.getHash('testpassword'));
  }

};
