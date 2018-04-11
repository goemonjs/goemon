let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

export default class Config {
  constructor(
    public root?: string,
    public port?: string,
    public Session?: any
  ) {
    this.root = rootPath;
    this.port = process.env.PORT;
    this.Session = {
        Secret: 'Aihd82920rjhdjqao299euudh3!@Zq',
        Resave: false,
        SaveUninitialized: false,
        Cookie: {
            MaxAge : 3600000 // 60 * 60 * 1000
        }
    };

    process.on('uncaughtException', (err) => {
        console.log(err);
    });
  }
}
