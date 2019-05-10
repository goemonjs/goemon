import React from 'react';

import { WithStyles, Typography, TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';

import { styles } from '../../../themes/material-ui-lightblue';

interface IProps  {
}

interface IState  {
  name: string;
  number: string;
  multiline: string;
  currency: string;
  myDate: Date;
}

const currencies = [{
    value: 'USD',
    label: '$',
  }, {
    value: 'EUR',
    label: '€',
  }, {
    value: 'BTC',
    label: '฿',
  }, {
    value: 'JPY',
    label: '¥',
  },
];

export class FormSample extends React.Component<IProps & WithStyles<typeof styles>, IState> {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Cat in the Hat',
      number: '1',
      multiline: 'Controlled',
      currency: 'EUR',
      myDate: new Date()
    };
  }

  public componentDidMount() {

    // this.setState({
    //   [name]: event.target.value,
    // });
  }

  public handleDateChange = (date) => {
    this.setState({
      myDate: date
    });
  }

  handleChange = (name, event) => {
    let state: any = {[name]: event.target.value};
    this.setState(state);
  }

  public render() {
    const { classes } = this.props;
    const { myDate } = this.state;

    return (
      <>
        <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        <form className={classes.container} noValidate autoComplete="off">
        <div className="pickers">
          <DatePicker label="Date" className={classes.textField}　value={myDate} onChange={this.handleDateChange} margin="normal"/>
          <TimePicker label="Time" className={classes.textField}　value={myDate} onChange={this.handleDateChange} margin="normal" />
          <DateTimePicker label="DateTime" className={classes.textField}　value={myDate} onChange={this.handleDateChange} margin="normal" />
        </div>
        <TextField id="name" label="Name" className={classes.textField}
          value={this.state.name} onChange={(e) => { this.handleChange('name', e); }} margin="normal" />
        <TextField id="uncontrolled" label="Uncontrolled" defaultValue="foo"
          className={classes.textField} margin="normal"/>
        <TextField required id="required" label="Required" defaultValue="Hello World"
          className={classes.textField} margin="normal" />
        <TextField error id="error" label="Error" defaultValue="Hello World"
          className={classes.textField} margin="normal"
        />
        <TextField id="password-input" label="Password" className={classes.textField}
          type="password" autoComplete="current-password" margin="normal" />
        <TextField id="multiline" label="Multiline" multiline
          rowsMax="4" value={this.state.multiline} onChange={(e) => { this.handleChange('multiline', e); }}
           className={classes.textField} margin="normal" />
        <TextField id="multiline-static" label="Multiline" multiline rows="4" defaultValue="Default Value"
          className={classes.textField} margin="normal" />
        <TextField id="helperText" label="Helper text" defaultValue="Default Value" className={classes.textField}
          helperText="Some important text" margin="normal" />
        <TextField id="with-placeholder" label="With placeholder" placeholder="Placeholder"
           className={classes.textField} margin="normal" />
        <TextField id="textarea" label="With placeholder multiline" placeholder="Placeholder"
          multiline className={classes.textField} margin="normal" />
        <TextField id="number" label="Number" value={this.state.number} onChange={(e) => { this.handleChange('number', e); }}
          type="number" className={classes.textField} InputLabelProps={{
            shrink: true,
          }} margin="normal"
        />
        <TextField id="search" label="Search field" type="search"
          className={classes.textField} margin="normal" />
        <TextField id="select-currency" select label="Select" className={classes.textField}
          value={this.state.currency} onChange={(e) => { this.handleChange('currency', e); }}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }} helperText="Please select your currency" margin="normal"        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="select-currency-native" select label="Native select" className={classes.textField}
          value={this.state.currency} onChange={(e) => { this.handleChange('currency', e); }}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency" margin="normal" >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField id="full-width" label="Label" InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder" helperText="Full width!" fullWidth margin="normal"
        />
      </form>
      </>
    );
  }
}

export default withStyles(styles)(FormSample);
