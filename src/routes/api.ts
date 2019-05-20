import express from 'express';
import { createJWTToken } from '../base/utilities/jwt';
import { logger } from '../base/utilities/logger';
import os from 'os';

let router = express.Router();

type httpPostDataLayout = {
  logger: string;
  timestamp: string;
  level: string;
  message: string;
  exception: string;
  url: string;
};

module.exports = function (app: express.Express) {
  app.use('/api', router);
};

router.post('/log', (req: any, res, next) => {
  const log: httpPostDataLayout = req.body;
  const timestamp: number = Number.parseInt(log.timestamp);
  const date = new Date(timestamp);

  logger.error(`${os.EOL}client timestamp: ${date.toISOString()}${os.EOL}url:${log.url}${os.EOL}${log.message}`);
});

router.get('/listTodos', (req, res, next) => {
  // Be careful of security when use this headres !!
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.json([
    { id: 1, text: 'first feched todo', completed: false },
    { id: 2, text: 'second feched todo', completed: true },
    { id: 3, text: 'third feched todo3', completed: false }
  ]);
});

router.get('/me', isAuthenticated, (req: any, res, next) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
});

router.get('/token', isAuthenticated, (req: any, res, next) => {
  if (!req.session) {
    throw new Error('Session expired');
  }

  try {
    const token = createJWTToken(req.user);
    return res.json({
      token,
    });
  } catch (error) {
    throw error;
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.render('error', {
    message: 'Unauthorized',
    error: {}
  });
}
