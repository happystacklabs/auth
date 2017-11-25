import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../containers/Register';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';


describe('Register', () => {
  describe('Route', () => {
    it('render Register on /register', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/register']}>
          <App/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Register/>)).toBe(true);
    });
  });

  describe('render sign in Link', () => {
    const app = mount(
      <MemoryRouter>
        <Register/>
      </MemoryRouter>
    );
    expect(app.containsMatchingElement(<Link to='/login'>Sign In</Link>)).toBe(true);
  });
});
