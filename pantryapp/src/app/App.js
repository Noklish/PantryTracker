import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthService } from './../AuthService';
import { withAuth } from './withAuth';
import { Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Header } from './Header';

import ROUTES from './../routes';

class App extends Component {
  constructor(props){
    super(props);

    this.auth = new AuthService();

    this.state = {
      user: '',
      redirect: ''
    }
  }

  handleLogout(){
    debugger;
    this.auth.logout();
    this.setState({ redirect: '/login' });
  }

  componentWillMount(){
    debugger;
    if(!this.auth.loggedIn()){
      this.setState({ redirect: '/login' });
    }
  }
  
  onLogin(){
    console.log("onLogin App");
    debugger;
      if(!this.auth.loggedIn()){
          alert("We're sorry, there was an error logging in. Please try again.");
          this.setState({ redirect: '/login' });
      }
      else {
          try {
              const profile = this.auth.getProfile();
              this.setState({
                  user: profile,
                  redirect: `/user/${profile.id}/pantry`
              });
          } catch(err){
              this.auth.logout();
              this.setState({ redirect: '/login' });
          }
      }
  }

  render() {
    debugger;
    console.log("App render");
    let globalEvents = {
      handleLogout: this.handleLogout,
      onLogin: this.onLogin
    }
    if(!this.auth.loggedIn()){
      return <Login onLogin={e => this.onLogin()}/>
    }
    return (
      <>
        <Router>
          <Header handleLogout={e => this.handleLogout()} user={this.auth.getProfile()}/>
          <Switch>
            { ROUTES.map(x => <Route key={x.path} path={x.path} render={(props) =>
            <x.component {...props} user={this.auth.getProfile()} {...globalEvents}/>}/>)}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
