import * as React from 'react';
import { Provider } from 'react-redux';
import { UserContext, IContextProps } from '../../context/user-context';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

interface IProps  {
  store: any;
  location?: string;
  context?: any;
  basename?: string;
}
export class AppContainer extends React.Component<IProps, {}> {
  render () {
    const { store, context, location, basename } = this.props;
    if ( typeof window !== 'undefined' ) { // Check whether this method is called on client or server
      return (
        <Provider store={store}>
          <BrowserRouter basename={basename}>
            <UserContext.Provider value={context}>
              {this.props.children}
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
            {this.props.children}
          </StaticRouter>
        </Provider>
        <script id="initial-data" type="text/plain" data-json={initialState}></script>
        </>
      );
    }
  }
}
