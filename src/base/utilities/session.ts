
// Copyright (c) 2019 The Goemon Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { isSet } from './object';

function renewStoreTTL(req: Express.Request, sid: string): Promise<boolean> {

  return new Promise((resolve, reject) => {
    // input check
    if (!isSet(() => req.sessionStore)) {
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

function destroySession(req: Express.Request): Promise<boolean> {

  return new Promise((resolve, reject) => {
    // input check
    if (!isSet(() => req.session)) {
      resolve(false);
    }

    // destroy
    req.session!.destroy(err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
