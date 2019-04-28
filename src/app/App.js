import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { Login } from './Login';
import RecipeTable from './RecipeTable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './../routes';

class App extends Component {
  state = {
    loggedIn: false
  }
  render() {
    return (
      <>
      {<Home />}
      </>
    );
  }
}

export default App;
