import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import App from '../App/App';
import { MemoryRouter } from 'react-router-dom';


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
});
