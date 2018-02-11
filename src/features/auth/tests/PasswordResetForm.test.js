import React from 'react';
import { mount } from 'enzyme';
import PasswordResetForm from '../components/PasswordResetForm';


describe('PasswordResetForm', () => {
  it('show error if token is not passed by props', () => {
    const form = mount(<PasswordResetForm />);
    expect(form.containsMatchingElement('Token is missing')).toBe(true);
  });

  describe('onChangeInput()', () => {
    it('will update the password value', () => {
      const form = mount(<PasswordResetForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(0).props().value).toBe('foo');
    });

    it('will update the passwordConfirm value', () => {
      const form = mount(<PasswordResetForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(1).props().value).toBe('foo');
    });
  });

  describe('validate', () => {
    it('show error message if password and passwordConfirm are empty', () => {
      const form = mount(<PasswordResetForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a password')).toBe(true);
      expect(form.containsMatchingElement('Please enter a password confirmation')).toBe(true);
    });

    it('show error message if password is less than 5 characters', () => {
      const form = mount(<PasswordResetForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
    });

    it('show error message if passwordConfirm is less than 5 characters', () => {
      const form = mount(<PasswordResetForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
    });

    it('show error message if passwordConfirm is not equal to password', () => {
      const form = mount(<PasswordResetForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foobaz' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password confirmation is different from password')).toBe(true);
    });

    it('should clear the input error message when start typing again', () => {
      const form = mount(<PasswordResetForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a password')).toBe(true);
      expect(form.containsMatchingElement('Please enter a password confirmation')).toBe(true);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foobar' } });
      expect(form.containsMatchingElement('Please enter a password')).toBe(false);
      expect(form.containsMatchingElement('Please enter a password confirmation')).toBe(false);
    });
  });

  describe('onSubmit()', () => {
    it('does nothing if the form isnt valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordResetForm onSubmit={spy} />);
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });

    it('send the password, passwordConfirm and token to the props callback if valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordResetForm token="foobaz" onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls[0]).toEqual(['foobar', 'foobar', 'foobaz']);
    });

    it('dont send the password, passwordConfirm and token if input are not valid', () => {
      const spy = jest.fn();
      const form = mount(<PasswordResetForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foobaz' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: '' } });
      form.find('input').at(1).simulate('change', { target: { value: '' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: '' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: '' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });
  });

  describe('isLoading', () => {
    it('set the submit button to loading when passed to props', () => {
      const form = mount(<PasswordResetForm isLoading />);
      expect(form.find('button').at(0).find('Spinner').length).toBe(1);
    });
  });
});
