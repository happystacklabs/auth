import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import { Login } from '../../features/auth/containers/Login';


describe('PrivateRoute', () => {
  it('redirect to login page when not auth', () => {
    const currentUser = undefined;
    const app = mount((
      <Router initialEntries={['/dashboard']}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} currentUser={currentUser} />
        </Switch>
      </Router>
    ));
    expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(true);
  });

  it('redirect to specified route when auth', () => {
    const currentUser = { username: 'foo' };
    const app = mount((
      <Router initialEntries={['/dashboard']}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} currentUser={currentUser} />
        </Switch>
      </Router>
    ));
    expect(app.containsMatchingElement(<h1>Dashboard</h1>)).toBe(true);
  });
});
