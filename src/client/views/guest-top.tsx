import * as React from 'react';
import { SimpleList } from './components/simple-list';

interface IProps extends React.Props<{}> {
  message: string;
  style: any;
}

export class GuestTop extends React.Component<IProps, any> {
  render() {
    let { message, style } = this.props;
    return (
      <>
        <div className="jumbotron">
          <h1>Express-React-Redux-Typescript Sample</h1>
          <p className="lead">Hello world!</p>
          <a className="btn btn-large btn-success" href="/simple">React Sample</a>
          <a className="btn btn-large btn-success" href="/redux">Redux Sample</a>
          <a className="btn btn-large btn-success" href="/auth">Auth Sample</a>
        </div>
      </>
    );
  }
}
