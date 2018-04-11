import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Link, match } from 'react-router-dom';
import { loadTodos } from '../actions/todo-actions';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';
import { renderRoutes } from 'react-router-config';

interface IProps  {
  match: any;
}

interface IState {
  hasError: boolean;
}

export default class TodoApp extends React.Component<IProps, IState> {

  // To provide initial data for Server side rendering, add this function
  static fetchData(store, protocol: string, host: string) {
    return store.dispatch(loadTodos(protocol + '://' + host + '/api/todos'));
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
