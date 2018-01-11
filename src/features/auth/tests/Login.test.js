import React from 'react';
import { Link, MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Login } from '../containers/Login';


describe('Login', () => {
  describe('create account link', () => {
    it('render create account Link', () => {
      const login = shallow(<Login />);
      expect(login.containsMatchingElement(<Link to="/register">Create an account</Link>)).toBe(true);
    });
  });

  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const login = mount(<Router><Login onUnload={spy} /></Router>);
      expect(spy.mock.calls.length).toBe(0);
      login.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
