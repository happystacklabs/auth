import React from 'react';
import ReactDOM from 'react-dom';
import Settings from '../containers/Settings';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';


describe('Settings', () => {
  describe('Route', () => {
    it('render Settings on /settings', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/settings']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Settings/>)).toBe(true);
    });
  });
});
