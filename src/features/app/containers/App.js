import React, { Component } from 'react';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import Login from '../../auth/containers/Login';
import Home from '../../../components/Home/Home';
import Register from '../../auth/containers/Register';
import PasswordReset from '../../auth/containers/PasswordReset';
import Dashboard from '../../../components/Dashboard/Dashboard';
import Settings from '../../settings/containers/Settings';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { redirect } from '../redux';
import agent from '../../../agent';
import PropTypes from 'prop-types';
import { appLoad } from '../redux';


const mapStateToProps = state => ({
  redirectTo: state.app.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => {
    dispatch(redirect());
  },
  onLoad: (token) => {
    dispatch(appLoad(token));
  },
});


export class App extends Component {
  static propTypes = {
    onLoad: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    this.onLoad();
  }

  onLoad = () => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    this.props.onLoad(token);
  };

  render() {
    return (
      <div>
        <Navbar/>
        <section className='mainContainer'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/password/new' component={PasswordReset}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/settings' component={Settings}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
