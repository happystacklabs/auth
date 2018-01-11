import React from 'react';
import { Link, MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Register } from '../containers/Register';


describe('Register', () => {
  describe('render sign in Link', () => {
    it('render the go back to login link', () => {
      const register = shallow(<Register />);
      expect(register.containsMatchingElement(<Link to="/login">Sign In</Link>)).toBe(true);
    });
  });

  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const register = mount(<Router><Register onUnload={spy} /></Router>);
      expect(spy.mock.calls.length).toBe(0);
      register.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
