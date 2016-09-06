import * as React from 'react';

interface IProps  {
}

export default class TodoApp extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        <hr />
        <ul>
          <li><a href="#" role="button">Add</a></li>
          <li><a href="#/counter" role="button">Counter</a></li>
        </ul>
        {this.props.children}
      </div>
      );
  }
}
