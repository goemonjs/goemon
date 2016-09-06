import * as React from 'react';

interface IProps extends React.Props<{}> {
  message:string;
}

export default class TodoListComposer extends React.Component<IProps, void> {
  render() {
    var { message} = this.props;
    return (
      <div>
        <h2>{message}</h2>
      </div>
    );
  }
}
