import * as React from 'react';

export interface IMainState {
  text: string;
  items?: any;
  hasError: boolean;
  errorInfo: string;
}

export interface IMainProps {
  items?: any;
  children?: any;
}

export class SimpleList extends React.Component<IMainProps, IMainState> {

  state: IMainState = {
    text : '',
    items : [],
    hasError: false,
    errorInfo: ''
  };

  constructor(props) {
    super(props);

    // this binds
    this.onChange = this.onChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  public componentDidMount() {
    this.state.items = this.props.items;
    this.setState(this.state);
  }

  public componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
       hasError: true,
       errorInfo: info
      });
    // You can also log the error to an error reporting service
  }

  public onChange(e) {
    this.setState({text: e.target.value});
  }

  public onClickAdd(e) {
    let itemCount = this.state.items.length + 1;
    let item = {
      id: itemCount,
      text: this.state.text
    };
    this.state.items.push(item);
    this.setState(this.state);
  }

  public render() {
    const { items = [], hasError, errorInfo } = this.state;

    return (
        <div>
          { hasError ? <p>ERROR</p> : null }
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
