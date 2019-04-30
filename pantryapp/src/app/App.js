import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthService } from './../AuthService';
import { withAuth } from './withAuth';
import { Redirect } from 'react-router-dom';

import ROUTES from './../routes';

class App extends Component {
  auth = new AuthService();
  debugger;
  render() {
    return (
      <>
        <Router>
          <Switch>
            { ROUTES.map(x => <Route key={x.path} path={x.path} {...x} />)}
          </Switch>
        </Router>
      </>
    );
  }

  handleLogout(){
    this.auth.logout();
    this.props.history.replace('/');
  }
}

export default withAuth(App);
