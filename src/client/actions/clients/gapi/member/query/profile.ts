import Schema from '../../../../../../routes/impl/gapi/member/schema';
import { Profile } from '../../../../../../routes/impl/gapi/member/gtypes';

export const getProfileQuery = `query {
  getProfile {
    email
  }
}`;

export type GETPROFILE_RESULT_TYPE = {
  getProfile: Profile;
};
