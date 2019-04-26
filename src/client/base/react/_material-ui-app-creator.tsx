// /*---------------------------------------------------------------------------------------------
//  *  Copyright (c) Lunascape Corporation. All rights reserved.
//  *--------------------------------------------------------------------------------------------*/
// import  React from 'react';
// import { Route, Switch } from 'react-router';
// import { BrowserRouter, StaticRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
// import { Provider } from 'react-redux';
// import { renderToString } from 'react-dom/server';
// import { SheetsRegistry } from 'react-jss/lib/jss';
// import JssProvider from 'react-jss/lib/JssProvider';
// import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
// import { I18nextProvider } from 'react-i18next';
// import * as moment from 'moment';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import MomentUtils from 'material-ui-pickers/utils/moment-utils';

// import i18nClient from '../../../localization/i18n-client';

// class JSTUtils extends MomentUtils {

//   getHours(date) {
//     return date.utcOffset(9).get('hours');
//   }

//   getDatePickerHeaderText(date) {
//     return date.utcOffset(9).format('ddd, MMM D');
//   }

//   getDayText(date) {
//     return date.utcOffset(9).format('D');
//   }

//   getYearText(date) {
//     return date.utcOffset(9).format('YYYY');
//   }
// }

// export function createClientApp(componant, theme, store, basename, preloadedLanguage = 'en') {
//   // Create a sheetsRegistry instance.
//   const sheetsRegistry = new SheetsRegistry();

//   const generateClassName = createGenerateClassName();

//   i18nClient.changeLanguage(preloadedLanguage);

//   // Localization moment
//   moment.locale(preloadedLanguage);

//   return (
//     <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
//       <I18nextProvider i18n={i18nClient}>
//         <MuiThemeProvider theme={theme}>
//           <Provider store={store}>
//             <BrowserRouter basename={basename}>
//               <MuiPickersUtilsProvider utils={JSTUtils}>
//                 {componant}
//               </MuiPickersUtilsProvider>
//             </BrowserRouter>
//           </Provider>
//         </MuiThemeProvider>
//       </I18nextProvider>
//     </JssProvider>
//   );
// }

// // Render the component to a string.
// export function renderOnServer(componant, theme, req, context, store, i18nServer) {

//   // Create a sheetsRegistry instance.
//   const sheetsRegistry = new SheetsRegistry();

//   const generateClassName = createGenerateClassName();

//   const html = renderToString(
//     <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
//       <I18nextProvider i18n={i18nServer}>
//         <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
//           <Provider store={store}>
//             <StaticRouter location={req.baseUrl + req.url} context={context}>
//               {componant}
//             </StaticRouter>
//           </Provider>
//         </MuiThemeProvider>
//       </I18nextProvider>
//     </JssProvider>
//   );

//   const css = sheetsRegistry.toString();

//   return {
//     html: html,
//     css: css
//   };
// }

//  // Grab the CSS from our sheetsRegistry.
