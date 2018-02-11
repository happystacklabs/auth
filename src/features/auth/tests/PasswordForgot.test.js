import React from 'react';
// import { MemoryRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { PasswordForgot } from '../containers/PasswordForgot';


describe('PasswordForgot', () => {
  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const history = { goBack: () => {} };
      const passwordForgot = mount((
        <PasswordForgot onUnload={spy} history={history} />
      ));
      expect(spy.mock.calls.length).toBe(0);
      passwordForgot.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe('emailSent', () => {
    it('switch for the email sent component when success', () => {
      const history = { goBack: () => {} };
      const passwordForgot = shallow(<PasswordForgot history={history} emailSent />);
      expect(passwordForgot.containsMatchingElement('Please check your email to reset your password.')).toBe(true);
    });
  });
});
