import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { UserContext, IContextProps } from '../../context/user-context';
// import i18n from '../../localization/i18n';
import { isClientSide } from '../utilities/utils';

interface IProps {
  i18n: any;
  store: any;
  location?: string;
  context?: any;
  basename?: string;
}
export class AppContainer extends React.Component<IProps, {}> {
  render() {
    const { store, context, location, basename, i18n } = this.props;

    if (isClientSide()) { // Check whether this method is called on client or server
      return (
        <Provider store={store}>
          <BrowserRouter basename={basename}>
            <UserContext.Provider value={context}>
              <I18nextProvider i18n={i18n}>
                {this.props.children}
              </I18nextProvider>
            </UserContext.Provider>
          </BrowserRouter>
        </Provider>
      );
    } else {
      let initialState = JSON.stringify(store.getState());
      return (
        <>
          <Provider store={store}>
            <StaticRouter location={location} context={context}>
              <I18nextProvider i18n={i18n}>
                {this.props.children}
              </I18nextProvider>
            </StaticRouter>
          </Provider>
          <script id="initial-data" type="text/plain" data-json={initialState}></script>
        </>
      );
    }
  }
}
