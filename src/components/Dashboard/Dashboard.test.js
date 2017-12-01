import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { App } from '../../features/app/containers/App';
import { MemoryRouter } from 'react-router-dom';


describe('Dashboard', () => {
  describe('Route', () => {
    it('render Dashboard on /dashboard', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Dashboard/>)).toBe(true);
    });
  });
});
