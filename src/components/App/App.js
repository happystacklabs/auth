import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Register from '../Register/Register';
import PasswordReset from '../PasswordReset/PasswordReset';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <section className='mainContainer'>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/password/new" component={PasswordReset}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
