import  React from 'react';
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { generateNumberFromTimestamp } from '../../base/utilities/file';
import { isProductionMode } from '../../base/utilities/debug';
import i18n from '../../client/localization/i18n';

/**
 * Server side renderer utility class
 */
export class ServerSideRenderer {
/**
 * Constructor
 * @param bundleFilePath builde file path of webpack
 */
  constructor(public bundleFilePath: string) {
  }

  /**
   * Render component on server side
   * @param req Express request object
   * @param res Express response object
   * @param ejsName ejs filename
   * @param ejsOptions ejs options
   * @param component container component
   * @param cssGenerator css generator
   */
  public render(req: any, res: any, ejsName: string, ejsOptions: any, component: any, cssGenerator?: () => string) {
    try {
      const protocol = (process.env.PROTOCOL || req.protocol);
      let host = process.env.HOST || req.headers.host;

      const lng = req.language;
      // console.log(`Request locale: ${lng}`);
      i18n.changeLanguage(lng);

      const html = renderToString(
        <>
          {component}
        </>
      );

      let config = ejsOptions.config !== undefined ? ejsOptions.config : {};

      if ( !isProductionMode() ) {
        const serverState =  {
          host: host,
          protocol: protocol,
        };

        Object.assign(config, serverState);
      }

      const timeStamp = generateNumberFromTimestamp(__dirname + '/../../../build/public/js/' + this.bundleFilePath);

      let option = {
        html: html,
        config: JSON.stringify(config),
        css: cssGenerator !== undefined ? cssGenerator() : '',
        bundle: '/js/' + this.bundleFilePath + '?ver=' + timeStamp
      };

      Object.assign(option, ejsOptions);

      // const lang = req.acceptsLanguages('fr', 'es', 'en', 'ja');

      res.render(ejsName, option);
    } catch ( err ) {
      console.error(err);
    }
  }

  /**
   * Use when need to set special initalState initialized by each component
   * @param req Express request object
   * @param res Express response object
   * @param ejsName ejs filename
   * @param ejsOptions ejs options
   * @param component container component
   * @param routes route
   * @param cssGenerator css generator
   */
  public renderWithInitialProps(req: any, res: any, ejsName: string, ejsOptions: any, component: any, routes, cssGenerator?: () => string) {
    // getInitalProps
    const branch = matchRoutes(routes, req.baseUrl + req.url);
    const promises = branch.map(({route}) => {
      let getInitialProps = route.component.getInitialProps;
      return getInitialProps instanceof Function ? getInitialProps() : Promise.resolve(undefined);
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
