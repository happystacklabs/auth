import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Register } from '../containers/Register';


describe('Register', () => {
  describe('render sign in Link', () => {
    it('render the go back to login link', () => {
      const register = shallow(<Register />);
      expect(register.containsMatchingElement(<Link to="/login">Sign In</Link>)).toBe(true);
    });
  });
});
