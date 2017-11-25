import React from 'react';
import ReactDOM from 'react-dom';
import PasswordReset from '../containers/PasswordReset';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';


describe('PasswordReset', () => {
  describe('Route', () => {
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
