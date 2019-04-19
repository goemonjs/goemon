/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { ISeedCreator } from '../../../base/objects/types';
import { Users } from '../../../models/user';

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
    try {
      await Users.createUser('test@example.com', 'testpassword', ['free']);
      await Users.createUser('admin@example.com', 'testpassword', ['admin']);
    } catch ( err ) {
      console.error('ERROR: Failed to ceate seed user');
    }
  }

};
