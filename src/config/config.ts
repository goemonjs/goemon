export interface ConfigType {
  root: string;
  port: string;
  session: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie: {
      maxAge: number;
    };
  };
  db?: {
    uri: string;
    port: number;
    dbPath: string;
    dbName: string;
  };
}
