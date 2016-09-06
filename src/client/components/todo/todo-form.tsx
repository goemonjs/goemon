import * as React from 'react';

export interface IProps {
  addTodo:(text: string) => void;
}

export interface IState {
  text: string;
}

export default class TodoFormComposer extends React.Component<IProps, IState> {

  state: IState = {
    text : ''
  };

  handleChange(e) {
    this.state.text = e.target.value;
    this.setState(this.state);
  }

  private handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    this.props.addTodo(this.state.text);
  }

  render() {
    const {text} = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" autoFocus={true} value={text} onChange={this.handleChange.bind(this)}/>
        <input type="submit" value="Add" />
      </form>
    );
  }
}
