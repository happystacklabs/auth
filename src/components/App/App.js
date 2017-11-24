import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default App;
