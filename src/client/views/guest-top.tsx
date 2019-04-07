import * as React from 'react';

interface IProps extends React.Props<{}> {
}

export class GuestTop extends React.Component<IProps, any> {
  render() {
    return (
      <>
        <div className="jumbotron">
          <h1>Goemon Tempalte</h1>
          <p className="lead">The boilerplate using React16, Redux, React-Router v4 + SSR(Server Side Rendering), Node, Express, and MongoDB in TypeScript.</p>
          <a className="btn btn-large btn-success" href="/react">React Sample</a>
          <a className="btn btn-large btn-success" href="/redux">Redux Sample</a>
        </div>
      </>
    );
  }
}
