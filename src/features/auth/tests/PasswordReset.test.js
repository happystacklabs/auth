import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { PasswordReset } from '../containers/PasswordReset';


describe('PasswordReset', () => {
  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const match = { params: { token: 'foo' } };
      const passwordReset = mount((
        <Router><PasswordReset match={match} onUnload={spy} /></Router>
      ));
      expect(spy.mock.calls.length).toBe(0);
      passwordReset.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe('serverErrors', () => {
    it('show an error message if token is invalid or expired', () => {
      const errors = { token: { msg: 'Password reset token is invalid or has expired' } };
      const match = { params: { token: 'foo' } };
      const passwordReset = mount(<Router><PasswordReset match={match} errors={errors} /></Router>);
      expect(passwordReset.containsMatchingElement(errors.token.msg)).toBe(true);
    });
  });

  describe('passwordReset', () => {
    it('redirect to login when success', () => {
      const match = { params: { token: 'foo' } };
      const passwordReset = shallow(<Router><PasswordReset match={match} passwordReset /></Router>);
      expect(passwordReset.containsMatchingElement('Reset Password')).toBe(false);
    });
  });
});
