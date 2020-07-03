import { createMuiTheme } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const drawerWidth = 240;

export const theme = createMuiTheme({
  palette: {
    primary: red,
    grey: red,
    type: 'light'
  }
});

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: 1600,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  title: {
    flex: 1,
    color: '#0',
  },
  logout: {
    color: '#0',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    textColor: '#0',
    color: '#0',
    height: 60,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 200,
  },
  menu: {
    width: 200,
  },
});
