import * as React from 'react';
import { Route } from 'react-router-dom';

interface IProps extends React.Props<{}> {
}

interface IDispProps extends React.Props<{}> {
}

export class NotFound extends React.Component<IProps & IDispProps, any> {
  render() {
    return (
      <Route render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            <h1>404 : Not Found</h1>
          </div>
        );
      }}/>
    );
  }
}
