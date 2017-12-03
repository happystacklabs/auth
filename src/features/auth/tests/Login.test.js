import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedLogin, { Login } from '../containers/Login';
import { MemoryRouter, Link } from 'react-router-dom';
import * as redux from '../redux';


describe('Login', () => {
  describe('create account link', () => {
    it('render create account Link', () => {
      const login = shallow(
        <Login/>
      );
      expect(login.containsMatchingElement(<Link to='/register'>Create an account</Link>)).toBe(true);
    });
  });
});
