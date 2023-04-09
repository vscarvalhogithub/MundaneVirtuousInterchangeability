import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import Home from './Home';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <<Route path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
