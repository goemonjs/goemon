import  React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from '../../../themes/material-ui-lightblue';

interface IProps  {
}

interface IState  {
  name: string;
  age: string;
  multiline: string;
  currency: string;
}

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export class FormSample extends React.Component<IProps & WithStyles<typeof styles>, IState> {

  public componentDidMount() {
    const state = {
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
    };

    this.setState(state);

    // this.setState({
    //   [name]: event.target.value,
    // });
  }

  public render() {
    const { classes } = this.props;

    return (
      <>
        <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        <form className={classes.container} noValidate autoComplete="off">
        {/* <TextField
          id="name"
          label="Name"
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error
          id="error"
          label="Error"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <TextField
          id="multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          // value={this.state.multiline}
          // onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="helperText"
          label="Helper text"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
        <TextField
          id="with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="textarea"
          label="With placeholder multiline"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="number"
          label="Number"
          // value={this.state.age}
          // onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          // onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          // value={this.state.currency}
          // onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField> */}
        <TextField
          id="full-width"
          label="Label"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
        />
      </form>
      </>
    );
  }
}

export default withStyles(styles)(FormSample);
