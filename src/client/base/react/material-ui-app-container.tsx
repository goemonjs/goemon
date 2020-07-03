import React from 'react';

import { SheetsRegistry } from 'react-jss';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { AppContainer } from './app-container';
import moment from 'moment';
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';

import { isClientSide } from '../utilities/utils';

interface IProps {
  i18n: any;
  store: any;
  theme: any;
  location?: string;
  context?: any;
  basename?: string;
  sheetsRegistry?: SheetsRegistry;
}

class MyUtils extends DateFnsUtils {

  constructor(value) {
    super(value);

    // this.yearFormat = 'YYYY';
    this.yearMonthFormat = 'MMM YYYY';
    this.dateTime12hFormat = 'MMM Do hh:mm a';
    this.dateTime24hFormat = 'MMM Do HH:mm';
    // this.time12hFormat = 'hh:mm A';
    // this.time24hFormat = 'HH:mm';
    this.dateFormat = 'MMM Do';
    // this.locale = 'ja';
  }

  getDatePickerHeaderText(date) {
    return date.utcOffset(9).format('ddd, MMM Do');
  }
}

export class MaterialUiAppContainer extends React.Component<IProps, {}> {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // if there is this code, design desapperes when production mode
    if (isClientSide()) {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
  }

  render() {
    const { theme, sheetsRegistry, i18n } = this.props;

    moment.locale(i18n.language);

    if (isClientSide()) { // Check whether this method is called on client or server
      return (
        // <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <AppContainer {...this.props} />
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
        // </JssProvider>
      );
    } else {
      return (
        // TODO
        // <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        // <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <AppContainer {...this.props} />
          </MuiThemeProvider>
        </MuiPickersUtilsProvider >
        // </JssProvider>
      );
    }
  }
}
