import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Login } from '../containers/Login';


describe('Login', () => {
  describe('create account link', () => {
    it('render create account Link', () => {
      const login = shallow(<Login />);
      expect(login.containsMatchingElement(<Link to="/register">Create an account</Link>)).toBe(true);
    });
  });
});
