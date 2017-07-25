import * as React from 'react';
import { Link } from 'react-router';

export interface IMainState {
  text:string;
  items?:any;
}

export interface IMainProps {
  items?:any;
  children?:any;
}

export default class SimpleApp extends React.Component<IMainProps, IMainState> {

  state: IMainState = {
    text : '',
    items : []
  };

  constructor() {
    super();

    // this binds
    this.onChange = this.onChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  componentWillMount() {
    this.state.items = this.props.items;
    this.setState(this.state);
  }

  public onChange(e) {
    this.setState({text: e.target.value});
  }

  public onClickAdd(e) {
    var number = this.state.items.length + 1;
    var item = {
      id:number,
      text:this.state.text
    };
    this.state.items.push(item);
    this.setState(this.state);
  }

  render() {
    const { items = [] } = this.state;
    return (
      <div>
        <h3>Simple Item View</h3>
        <ul>
          {items.map(item => {
            return (<li key={item.id}>{item.id}: {item.text}</li>);
          })}
        </ul>
        <input onChange={this.onChange} value={this.state.text} />
        <button onClick={this.onClickAdd}>{'Add #' + (this.state.items.length + 1)}</button>
      </div>
    );
  }
}
