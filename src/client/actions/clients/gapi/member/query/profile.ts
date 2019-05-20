import Schema from '../../../../../../routes/impl/gapi/member/schema';
import { Profile } from '../../../../../../routes/impl/gapi/member/gtypes';

export const getProfileQuery = `query {
  getProfile {
    email,
    roles,
    displayName,
    isEmailVeried,
    firstName,
    middleName,
    lastName,
    birthDay,
    createdAt,
    updatedAt
  }
}`;

export type GETPROFILE_RESULT_TYPE = {
  getProfile: Profile;
};
