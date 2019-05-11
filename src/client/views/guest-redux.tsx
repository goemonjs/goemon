import React from 'react';
import config from 'react-global-configuration';
import { Route, Switch } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
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
  static async getInitialProps(options: any) {
    return options.store.dispatch(listTodo(options));
  }

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
