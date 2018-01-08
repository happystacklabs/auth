import React from 'react';
import { mount } from 'enzyme';
import RegisterForm from '../components/RegisterForm';


describe('RegisterForm', () => {
  describe('onChangeInput()', () => {
    it('will update the username value', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(0).props().value).toBe('foo');
    });

    it('will update the password value', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(1).props().value).toBe('foo');
    });

    it('will update the password value', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(2).props().value).toBe('foo');
    });
  });

  describe('validate', () => {
    it('show error message if username, email and password are empty', () => {
      const form = mount(<RegisterForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a username')).toBe(true);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
      expect(form.containsMatchingElement('Please enter a password')).toBe(true);
    });

    it('show error message if password is less than 5 characters', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
    });

    it('show error message if username is less than 5 characters', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Username must be at least 5 characters')).toBe(true);
    });

    it('should clear the input error message when start typing again', () => {
      const form = mount(<RegisterForm />);
      form.find('button').at(0).simulate('submit');
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
      expect(form.containsMatchingElement('Please enter a password')).toBe(true);
      form.find('input').at(1).simulate('change', { target: { value: 'foo@bar.com' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(false);
      expect(form.containsMatchingElement('Please enter a password')).toBe(true);
      form.find('input').at(2).simulate('change', { target: { value: 'foobar' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(false);
      expect(form.containsMatchingElement('Please enter a password')).toBe(false);
    });

    it('show error message if email is not valid', () => {
      const form = mount(<RegisterForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a valid email address')).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('does nothing if the form isnt valid', () => {
      const spy = jest.fn();
      const form = mount(<RegisterForm onSubmit={spy} />);
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });

    it('send the username, email and password to the props callback if valid', () => {
      const spy = jest.fn();
      const form = mount(<RegisterForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls[0]).toEqual(['foobar', 'foo@hotmail.com', 'foobar']);
    });

    it('dont send the username, email and password if input are not valid', () => {
      const spy = jest.fn();
      const form = mount(<RegisterForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: '' } });
      form.find('input').at(1).simulate('change', { target: { value: '' } });
      form.find('input').at(2).simulate('change', { target: { value: '' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
      form.find('input').at(0).simulate('change', { target: { value: '' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: '' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });
  });

  describe('isLoading', () => {
    it('set the submit button to loading when passed to props', () => {
      const form = mount(<RegisterForm isLoading />);
      expect(form.find('button').at(0).find('Spinner').length).toBe(1);
    });
  });
});
