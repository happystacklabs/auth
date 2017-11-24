import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Home from '../Home/Home';
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
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
