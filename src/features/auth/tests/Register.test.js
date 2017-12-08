import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../app/containers/App';
import { MemoryRouter, Link } from 'react-router-dom';
import ConnectedRegister, { Register } from '../containers/Register';


describe('Register', () => {
  describe('render sign in Link', () => {
    it('render the go back to login link', () => {
      const register = shallow(
        <Register/>
      );
      expect(register.containsMatchingElement(<Link to='/login'>Sign In</Link>)).toBe(true);
    });
  });
});
