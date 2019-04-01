import * as React from 'react';
import { matchRoutes } from 'react-router-config';
import { renderOnServer } from '../../client/base/common/route';

let jsDate: number = 0;

export class Renderer {

  constructor(public store, public routeComponent, public routes, public theme) {
  }

  public ssrRouteHandler(req: any, res: any, ejsName: string, ejsOptions: any) {
    let context: any = {};
    const protocol = process.env.PROTOCOL || req.protocol;
    let host = process.env.HOST || req.headers.host;

    // getInitalProps
    const branch = matchRoutes(this.routes, req.baseUrl + req.url);
    const promises = branch.map(({route}) => {
      let getInitialProps = route.component.getInitialProps;
      return getInitialProps instanceof Function ? getInitialProps(this.store, protocol, host) : Promise.resolve(undefined);
    });

    return Promise.all(promises).then((data) => {
      // render on server side
      let context: any = {};

      let contents = renderOnServer(this.routeComponent, this.theme, req, context, this.store);

      if ( context.status === 404) {
        res.status(404);
      } else if (context.status === 302) {
        return res.redirect(302, context.url);
      }

      let initialState = this.store.getState();
      if ( ejsOptions.initialState != undefined ) {
        initialState = ejsOptions.initialState ;
      }

      let option = {
        html: contents.html,
        css: contents.css,
        initialState: JSON.stringify(initialState),
        jsDate: jsDate
      };

      Object.assign(option, ejsOptions);

      res.render(ejsName, option);
    });
  }
}
