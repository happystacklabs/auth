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
import { Spinner } from '@happystack/kit';
import { logout } from '../../auth/redux';


const mapStateToProps = state => ({
  redirectTo: state.app.redirectTo,
  currentUser: state.app.currentUser,
  appLoaded: state.app.appLoaded,
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => {
    dispatch(redirect());
  },
  onLoad: (token) => {
    dispatch(appLoad(token));
  },
  logout: () => {
    dispatch(logout());
  },
});

const propTypes = {
  onLoad: PropTypes.func,
};

export class App extends Component {
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
    if (!this.props.appLoaded) {
      return (
        <div>
          <Navbar loading />
          <section className="mainContainer">
            <Spinner className="loadingApp" type="loader1" color="inkLight" size="large" />
          </section>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar currentUser={this.props.currentUser} logout={this.props.logout} />
          <section className="mainContainer">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/password/new" component={PasswordReset} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </section>
        </div>
      );
    }
  }
}

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
