import React from 'react';
import {Login} from '../containers/Login';
import {Link} from 'react-router-dom';
import {shallow} from 'enzyme';


describe('Login', () => {
  describe('create account link', () => {
    it('render create account Link', () => {
      const login = shallow(
        <Login />
      );
      expect(login.containsMatchingElement(<Link to="/register">Create an account</Link>)).toBe(true);
    });
  });
});
