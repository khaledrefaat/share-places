import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import Users from './user/containers/Users';
import NewPlace from './places/containers/NewPlace';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/place/new" style={{ marginLeft: '20px' }}>
        New place
      </Link>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/place/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
