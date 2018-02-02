import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '@happystack/kit';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import Login from '../../auth/containers/Login';
import Home from '../../../components/Home/Home';
import Register from '../../auth/containers/Register';
import PasswordReset from '../../auth/containers/PasswordReset';
import Dashboard from '../../../components/Dashboard/Dashboard';
import Settings from '../../settings/containers/Settings';
import { redirect, appLoad } from '../redux';
import agent from '../../../agent';
import { logout } from '../../auth/redux';
import PrivateRoute from '../../../components/PrivateRoute/PrivateRoute';
import PublicRoute from '../../../components/PublicRoute/PublicRoute';


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
  redirectTo: PropTypes.string,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  appLoaded: PropTypes.bool,
  logout: PropTypes.func,
  onLoad: PropTypes.func,
  onRedirect: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};


const defaultProps = {
  redirectTo: null,
  currentUser: undefined,
  appLoaded: false,
  logout: undefined,
  onLoad: undefined,
  onRedirect: undefined,
  history: undefined,
};


export class App extends Component {
  componentWillMount() {
    this.onLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
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
          <section className="main-container">
            <Spinner className="main-container__spinner" type="loader1" color="ink-light" size="large" />
          </section>
        </div>
      );
    }
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} logout={this.props.logout} />
        <section className="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" currentUser={this.props.currentUser} component={Login} />
            <PublicRoute path="/register" currentUser={this.props.currentUser} component={Register} />
            <Route path="/password/new" component={PasswordReset} />
            <PrivateRoute path="/dashboard" currentUser={this.props.currentUser} component={Dashboard} />
            <PrivateRoute path="/settings" currentUser={this.props.currentUser} component={Settings} />
          </Switch>
        </section>
      </div>
    );
  }
}


App.propTypes = propTypes;
App.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(App);
