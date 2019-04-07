import { Store } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      auth?: any;
      sessionStore?: Store;
    }
  }
}
