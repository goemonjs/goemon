import { Express } from 'express';
import GuestApolloServer from './impl/gapi/guest/index';
import MemberApolloServer from './impl/gapi/member/index';
import AdminApolloServer from './impl/gapi/admin/index';

module.exports = function (app: Express) {
  GuestApolloServer.applyMiddleware({ app, path: '/gapi/guest' });
  MemberApolloServer.applyMiddleware({ app, path: '/gapi/member' });
  AdminApolloServer.applyMiddleware({ app, path: '/gapi/admin' });
};
