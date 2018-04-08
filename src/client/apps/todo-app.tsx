import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Link, match } from 'react-router-dom';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';

interface IProps  {
  match: any;
}

interface IState {
  hasError: boolean;
}

export default class TodoApp extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { match } = this.props;
    return (
      <div>
        <h3><span>{match.url}</span></h3>
        <hr />
        <ul>
          <li><Link to={`${match.url}`}>Add</Link></li>
          <li><Link to={`${match.url}/counter`}>Counter</Link></li>
        </ul>
        <Switch>
          <Route exact path={`${match.url}`} component={TodoList} />
          <Route exact path={`${match.url}/counter`} component={TodoCounter} />
          <Route><h1>Not Found</h1></Route>
        </Switch>
      </div>
      );
  }
}
