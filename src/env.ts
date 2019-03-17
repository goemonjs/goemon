export type EnvType = {
  name?: string;         // Enviroment name
  development: boolean;    // Whether this value is needed on both development
  production: boolean;  // Whether this value is needed on production mode
  defaultValue?: any;
  value?: any;
  type?: any;
};

type MyEnvsType = 'HOST'
  | 'PORT'
  | 'PROTOCOL'
  | 'VERBOSE'
  | 'NODE_ENV'
  | 'NODE_CONFIG_DIR'
  | 'SESSION_SECRET'
  | 'SESSION_RESAVE'
  | 'SESSION_SAVE_UNINITIALIZED'
  | 'SESSION_COOKIE_MAXAGE'
  | 'SESSION_DRIVER'
  | 'SESSION_DRIVER_OPTION'
  | 'SESSION_DRIVER_HOST'
  | 'SESSION_DRIVER_PORT'
  | 'SESSION_DRIVER_PASSWORD'
  | 'STATIC_CONTENTS_CACHE'
  | 'HTTP_CACHE_MAXAGE';

// These default values are overwritten by .env values
export const envs: { [P in MyEnvsType] : EnvType } = {
  HOST: { development: false, production: false },
  PORT: { development: false, production: false, defaultValue: process.env.NODE_ENV == 'production' ? 80 : 3000 },
  PROTOCOL: { development: false, production: false, defaultValue: 'http' }, // default | http | https
  VERBOSE: { development: false, production: false, defaultValue: false },  // true | false
  NODE_ENV: { development: true, production: true },
  NODE_CONFIG_DIR: { development: false, production: true },
  SESSION_SECRET: { development: false, production: true, defaultValue: 'Aihd82920rjhdjqao299euudh3!@Zq' },
  SESSION_RESAVE: { development: false, production: false, defaultValue: false },
  SESSION_SAVE_UNINITIALIZED: { development: false, production: true, defaultValue: false },
  SESSION_COOKIE_MAXAGE: { development: false, production: false, defaultValue: 60 * 60 * 24 * 8 }, // 8days
  SESSION_DRIVER: { development: false, production: false, defaultValue: 'default' }, // default | redis
  SESSION_DRIVER_OPTION: { development: false, production: false }, // default | redis
  SESSION_DRIVER_HOST: { development: false, production: false },
  SESSION_DRIVER_PORT: { development: false, production: false },
  SESSION_DRIVER_PASSWORD: { development: false, production: false },
  STATIC_CONTENTS_CACHE: { development: false, production: false, defaultValue: 60 * 60 * 24 },
  HTTP_CACHE_MAXAGE: { development: false, production: false },
};
