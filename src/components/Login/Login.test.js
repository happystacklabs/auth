import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import App from '../App/App';
import { MemoryRouter, Link } from 'react-router-dom';


describe('Login', () => {
  describe('Route', () => {
    it('render Login on /Login', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/login']}>
          <App/>
        </MemoryRouter>
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
});
