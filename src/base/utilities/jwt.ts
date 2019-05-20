import jwt from 'jsonwebtoken';
import { envs } from '../../env';

export function createJWTToken(obj: object) {
  const secret = envs.JWT_TOKEN_SECRET.value;
  if (!secret) {
    throw new Error('process.env.JWT_TOKEN_SECRET must be set.');
  }

  return jwt.sign(obj, secret, {
    expiresIn: '60m'
  });
}

export const verifyJWTToken = (token: string): Promise<any> => {
  return new Promise((done, fail) => {
    const secret = envs.JWT_TOKEN_SECRET.value;
    if (!secret) {
      fail(new Error('process.env.JWT_TOKEN_SECRET must be set.'));
    }

    jwt.verify(token, secret, (err, encoded) => {
      if (err) {
        fail(err);
      }
      done(encoded);
    });
  });
};
