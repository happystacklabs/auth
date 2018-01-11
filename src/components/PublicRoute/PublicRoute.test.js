import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import PublicRoute from './PublicRoute';
import Dashboard from '../Dashboard/Dashboard';
import { Login } from '../../features/auth/containers/Login';


describe('PublicRoute', () => {
  it('redirect to dashboard page when auth', () => {
    const currentUser = { username: 'foo' };
    const app = mount((
      <Router initialEntries={['/login']}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} currentUser={currentUser} />
        </Switch>
      </Router>
    ));
    expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(false);
  });

  it('redirect to specified route when not auth', () => {
    const currentUser = undefined;
    const app = mount((
      <Router initialEntries={['/login']}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} currentUser={currentUser} />
        </Switch>
      </Router>
    ));
    expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(true);
  });
});
