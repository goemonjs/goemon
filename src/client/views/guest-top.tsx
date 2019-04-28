import  React from 'react';
import { Trans } from 'react-i18next';

interface IProps extends React.Props<{}> {
  t?: any;
}

export class GuestTop extends React.Component<IProps, any> {
  render() {
    return (
      <>
        <div className="jumbotron">
        <h1><Trans i18nKey="Goemon">Goemon-</Trans></h1>
          <p className="lead">The boilerplate using React16, Redux, React-Router v4 + SSR(Server Side Rendering), Node, Express, and MongoDB in TypeScript.</p>
          <a className="btn btn-large btn-success" href="/react">React Sample</a>
          <a className="btn btn-large btn-success" href="/redux">Redux Sample</a>
          <div>
            <a href= "/?locale=en">英語</a></div>
            <a href= "/?locale=ja">日本語</a>
          </div>
      </>
    );
  }
}
