import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../containers/Login';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';


describe('Login', () => {
  describe('Route', () => {
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
  describe('render create account Link', () => {
    const app = mount(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    );
    expect(app.containsMatchingElement(<Link to='/register'>Create an account</Link>)).toBe(true);
  });

  describe('Forgot Password?', () => {
  });
});
