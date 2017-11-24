import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import App from '../App/App';
import { MemoryRouter } from 'react-router-dom';


describe('Home', () => {
  describe('Route', () => {
    it('render Login on /Login', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Home/>)).toBe(true);
    });
  });
});
