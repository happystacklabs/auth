import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Login } from '../containers/Login';
import { App } from '../../app/containers/App';
import { store } from '../../../store';
import { Register } from '../containers/Register';
import PasswordReset from '../containers/PasswordReset';
import localStorageMock from '../../../__mocks__/localStorage';


window.localStorage = localStorageMock;


describe('auth::routes', () => {
  describe('Login', () => {
    it('render Login on /login when not loggued in', () => {
      const currentUser = undefined;
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/login']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<Login />)).toBe(true);
    });

    it('redirect to /dashboard when loggued in', () => {
      const currentUser = { username: 'foo' };
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/login']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(false);
    });
  });

  describe('Register', () => {
    it('render Register on /register when not loggued in', () => {
      const currentUser = undefined;
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/register']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<Register />)).toBe(true);
    });

    it('redirect to /dashboard when loggued in', () => {
      const currentUser = { username: 'foo' };
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/register']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<h1>Dashboard</h1>)).toBe(true);
    });
  });

  describe('PasswordReset', () => {
    it('render PasswordReset on /password/new', () => {
      const app = mount((
        <Router initialEntries={['/password/new']}>
          <App onLoad={() => {}} appLoaded />
        </Router>
      ));
      expect(app.containsMatchingElement(<PasswordReset />)).toBe(true);
    });
  });
});
