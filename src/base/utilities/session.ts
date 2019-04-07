/**
 * Session service
 *
 * Basical session service module
 *
 * @package   lunascape.tp.store.server.service.session
 * @category  Service
 * @author    T.Takamatsu <takamatsu@tactical.jp>
 */

import { Express } from 'express';
import { isSet } from './object';

/**
 * Renew sessionStore TTL
 *
 * Renew sessionStore TTL in Express request
 *
 * @param req Express request
 * @param sid Session ID
 * @return boolean
 */
function renewStoreTTL(req: Express.Request, sid: string): Promise<boolean> {

  return new Promise((resolve, reject) => {
    // input check
    if (!isSet( () => req.sessionStore )) {
      resolve(false);
    }

    // touch
    req.sessionStore!.touch(sid, req.session!, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * Restore session from Express request
 *
 * Restore session from Express request which contains JWT payload and sessionStore
 *
 * @param req Express request
 * @param sid Session ID
 * @return Object
 */
function restoreSession(req: Express.Request, sid: string): Promise<any> {

  return new Promise((resolve, reject) => {
    // input check
    if (!req || !req.sessionStore) {
      reject(new Error('session store not exists'));
    }

    req.sessionStore!.get(sid, (err, sess) => {
      if (err) {
        reject(err);
      } else if (!sess) {
        reject(new Error('failed to load session from store'));
      } else {
        resolve(sess);
      }
    });
  });
}

/**
 * Destroy session async
 *
 * @param req Express request
 * @return Promise (Success: true, Fail: false)
 */
function destroySession(req: Express.Request): Promise<boolean> {

  return new Promise((resolve, reject) => {
    // input check
    if (!isSet( () => req.session )) {
      resolve(false);
    }

    // destroy
    req.session!.destroy( err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
