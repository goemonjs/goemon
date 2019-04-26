import React from 'react';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { AppContainer } from './app-container';

interface IProps  {
  store: any;
  location?: string;
  context?: any;
  basename?: string;
  theme?: any;
  sheetsRegistry?: SheetsRegistry;
}
export class MaterialUiAppContainer extends React.Component<IProps, {}> {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render () {
    const { theme, sheetsRegistry } = this.props;

    const generateClassName = createGenerateClassName();

    if ( typeof window !== 'undefined' ) { // Check whether this method is called on client or server
      return (
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <AppContainer {...this.props} />
        </MuiThemeProvider>
      </JssProvider>
      );
    } else {
      return (
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <AppContainer {...this.props} />
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }
}
