
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { listTodo } from '../actions/todo-actions';
import TodoList from './parts/todo/todo-list';
import TodoCounter from './parts/todo/todo-counter';
interface IProps extends React.Props<{}>, RouteComponentProps<{}> {
  match: any;
}

interface IState {
  hasError: boolean;
}

export class GuestRedux extends React.Component<IProps, IState> {

  // To provide initial data for Server side rendering, add this function
  // static async getInitialProps(store, protocol: string, host: string) {
  //   return store.dispatch(listTodo(protocol + '://' + host + '/api/todos'));
  // }

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { match } = this.props;
    return (
      <div>
        <h3>MatchUrl : {match.url}</h3>
        <hr />
        <ul>
          <li><Link to={`${match.url}`}>Add</Link></li>
          <li><Link to={`${match.url}/counter`}>Counter</Link></li>
        </ul>
        <Switch>
          <Route exact path={`${match.url}`} component={TodoList} />
          <Route exact path={`${match.url}/counter`} component={TodoCounter} />
        </Switch>
      </div>
      );
  }
}
