import React from 'react';
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
const XmlEntities = require('html-entities').XmlEntities;
const xmlEntities = new XmlEntities();
import { generateNumberFromTimestamp } from '../../base/utilities/file';
import { isProductionMode } from '../../base/utilities/debug';
import i18n from '../../client/localization/i18n';
import { logger } from '../../base/utilities/logger';

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
  public render(req: any, res: any, ejsName: string, ejsOptions: any, store: any, component: (req, store, i18n) => any, cssGenerator?: () => string) {
    try {
      const protocol = (process.env.PROTOCOL || req.protocol);
      let host = process.env.HOST || req.headers.host;

      const lng = req.language;
      logger.debug(`Request locale: ${lng}`);
      const i18nServer = i18n.cloneInstance();
      i18nServer.changeLanguage(lng);

      const html = renderToString(
        <>
          {component(req, store, i18nServer)}
        </>
      );

      let config = ejsOptions.config !== undefined ? ejsOptions.config : {};

      if (!isProductionMode()) {
        const serverState = {
          host: host,
          protocol: protocol,
        };

        Object.assign(config, serverState);
      }

      const timeStamp = generateNumberFromTimestamp(__dirname + '/../../../build/public/js/' + this.bundleFilePath);

      let option = {
        html: html,
        config: xmlEntities.encode(JSON.stringify(config)),
        css: cssGenerator !== undefined ? cssGenerator() : '',
        bundle: '/js/' + this.bundleFilePath + '?ver=' + timeStamp
      };
      Object.assign(ejsOptions, option);

      res.render(ejsName, ejsOptions);
    } catch (err) {
      logger.error(err);
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
  public renderWithInitialProps(req: any, res: any, ejsName: string, ejsOptions: any, store, component: (req, store, i18n) => any, routes, cssGenerator?: () => string) {

    const protocol = (process.env.PROTOCOL || req.protocol);
    const host = process.env.HOST || req.headers.host;

    const branch = matchRoutes(routes, req.baseUrl + req.url);
    const promises = branch.map(({ route }) => {
      let getInitialProps = route.component.getInitialProps;
      return getInitialProps instanceof Function ? getInitialProps({
        protocol: protocol,
        host: host,
        store: store,
        req: req,
        env: process.env
      }) : Promise.resolve(undefined);
    });

    return Promise.all(promises).then((data) => {
      let option = {
        initialState: JSON.stringify(data),
      };
      Object.assign(option, ejsOptions);

      this.render(req, res, ejsName, ejsOptions, store, component, cssGenerator);
    });
  }

}
