import * as React from 'react';

interface IProps extends React.Props<{}> {
  message: string;
  style: any;
}

export default class TodoListComposer extends React.Component<IProps, any> {
  render() {
    let { message, style } = this.props;
    return (
      <span style={style}>
        {message}
      </span>
    );
  }
}
