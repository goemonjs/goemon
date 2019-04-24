import * as React from 'react';
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { generateNumberFromTimestamp } from '../../base/utilities/file';

export class ServerSideRenderer {

  constructor(public bundleFilePath: string, public store: any) {
  }

  public render(req: any, res: any, ejsName: string, ejsOptions: any, component: any, cssGenerator?: () => string) {
    const protocol = (process.env.PROTOCOL || req.protocol) + '://';
    let host = process.env.HOST || req.headers.host;
    const html = renderToString(
      <>
        {component}
      </>
    );

    let initialState = this.store.getState();
    if ( ejsOptions.initialState != undefined ) {
      initialState = ejsOptions.initialState ;
    }

    const serverState =  {
      host: host,
      protocol: protocol + '://',
    };

    let option = {
      html: html,
      initialState: JSON.stringify(initialState),
      serverState: serverState,
      config: ejsOptions.config !== undefined ? ejsOptions.config : '',
      css: cssGenerator !== undefined ? cssGenerator() : '',
      bundle: this.bundleFilePath + '?ver=' + generateNumberFromTimestamp(__dirname + '/../../public/' + this.bundleFilePath)
    };

    Object.assign(option, ejsOptions);

    res.render(ejsName, option);
  }

  public renderWithInitialProps(req: any, res: any, ejsName: string, ejsOptions: any, component: any, routes, cssGenerator?: () => string) {
    const protocol = (process.env.PROTOCOL || req.protocol) + '://';
    let host = process.env.HOST || req.headers.host;

    // getInitalProps
    const branch = matchRoutes(routes, req.baseUrl + req.url);
    const promises = branch.map(({route}) => {
      let getInitialProps = route.component.getInitialProps;
      return getInitialProps instanceof Function ? getInitialProps(this.store, protocol, host) : Promise.resolve(undefined);
    });

    return Promise.all(promises).then((data) => {
      let option = {
        initialState: JSON.stringify(data),
      };
      Object.assign(option, ejsOptions);
      this.render(req, res, ejsName, ejsOptions, component, cssGenerator);
    });
  }

}
