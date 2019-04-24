import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { Login } from './Login';

class App extends Component {
  state = {
    loggedIn: false
  }
  render() {
    return (
      <>
      {!this.state.loggedIn && <Login></Login>}
      {this.state.loggedIn && <Home></Home>}
      </>
    );
  }
}

export default App;
