/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { ISeedCreator } from '../../../base/objects/types';
import { Users } from '../../../models/user';
import { logger } from '../../../base/utilities/logger';

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
      await Users.createUser({
        email: 'test@example.com',
        password: 'testpassword',
        displayName: 'Test Normal User',
        profile: {
          image: undefined,
          firstName: 'First',
          middleName: 'Middle',
          lastName: 'Last',
          birthDay: new Date()
        },
        roles: ['free']
      });
      await Users.createUser({
        email: 'admin@example.com',
        password: 'testpassword',
        displayName: 'Test Admin User',
        profile: {
          image: undefined,
          firstName: 'First',
          middleName: 'Middle',
          lastName: 'Last',
          birthDay: new Date()
        },
        roles: ['admin']
      });
    } catch (err) {
      logger.error('ERROR: Failed to ceate seed user');
    }
  }

};
