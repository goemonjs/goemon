import * as express from 'express';
let router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/api', router);
};

router.post('/items', (req, res, next) => {
  res.json([
    { id: 1, text: 'first' },
    { id: 2, text: 'second' },
    { id: 3, text: 'third' }
  ]);
});

router.post('/listTodo', (req, res, next) => {
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

router.post('/me', isAuthenticated, (req: any, res, next) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
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
