import React from 'react';
import { mount } from 'enzyme';
import PasswordForgotForm from '../components/PasswordForgotForm';


describe('PasswordForgotForm', () => {
  describe('onChangeInput()', () => {
    it('will update the email value', () => {
      const form = mount(<PasswordForgotForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(0).props().value).toBe('foo');
    });
  });

  describe('validate', () => {
    it('show error message if email is empty', () => {
      const form = mount(<PasswordForgotForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
    });

    it('should clear the input error message when start typing again', () => {
      const form = mount(<PasswordForgotForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
      form.find('button').at(0).simulate('submit');
      form.find('input').at(0).simulate('change', { target: { value: 'foo@bar.com' } });
      expect(form.containsMatchingElement('Please enter an email address')).toBe(false);
    });

    it('show error message if email is not valid', () => {
      const form = mount(<PasswordForgotForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a valid email address')).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('does nothing if the form isnt valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordForgotForm onSubmit={spy} />);
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });

    it('send the email to the props callback if valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordForgotForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls[0]).toEqual(['foo@hotmail.com']);
    });

    it('dont send the email if input are not valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordForgotForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe('isLoading', () => {
    it('set the submit button to loading when passed to props', () => {
      const form = mount(<PasswordForgotForm isLoading />);
      expect(form.find('button').at(0).find('Spinner').length).toBe(1);
    });
  });
});
