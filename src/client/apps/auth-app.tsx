import * as React from 'react';

interface IProps  {
}

export default class TodoApp extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
      );
  }
}
