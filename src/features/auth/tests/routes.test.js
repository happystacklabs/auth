import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../containers/Login';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import Register from '../containers/Register';
import PasswordReset from '../containers/PasswordReset';


describe('auth::routes', () => {
  describe('Login', () => {
    it('render Login on /login', () => {
      const app = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App/>
          </MemoryRouter>
        </Provider>
      );
      expect(app.containsMatchingElement(<Login/>)).toBe(true);
    });
  });

  describe('Register', () => {
    it('render Register on /register', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/register']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Register/>)).toBe(true);
    });
  });

  describe('PasswordReset', () => {
    it('render PasswordReset on /password/new', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/password/new']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<PasswordReset/>)).toBe(true);
    });
  });
});
