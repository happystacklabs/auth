import React from 'react';
import { mount } from 'enzyme';
import SettingsForm from '../components/SettingsForm';


describe('SettingsForm', () => {
  describe('onChangeInput()', () => {
    it('will update the username value', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(0).props().value).toBe('foo');
    });

    it('will update the email value', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(1).props().value).toBe('foo');
    });

    it('will update the password value', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      expect(form.find('input').at(2).props().value).toBe('foo');
    });
  });

  describe('validate', () => {
    it('show error message if username and email are empty', () => {
      const form = mount(<SettingsForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a username')).toBe(true);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
    });

    it('show error message if password is less than 5 characters', () => {
      const form = mount(<SettingsForm />);
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(false);
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
    });

    it('show error message if username is less than 5 characters', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Username must be at least 5 characters')).toBe(true);
    });

    it('should clear the input error message when start typing again', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(2).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      form.find('input').at(0).simulate('change', { target: { value: 'foo' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(true);
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
      form.find('input').at(1).simulate('change', { target: { value: 'foo@bar.com' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(false);
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(true);
      form.find('input').at(2).simulate('change', { target: { value: 'foobar' } });
      expect(form.containsMatchingElement('Please enter a username')).toBe(false);
      expect(form.containsMatchingElement('Please enter an email address')).toBe(false);
      expect(form.containsMatchingElement('Password must be at least 5 characters')).toBe(false);
    });

    it('show error message if email is not valid', () => {
      const form = mount(<SettingsForm />);
      form.find('input').at(1).simulate('change', { target: { value: 'foo' } });
      form.find('button').at(0).simulate('submit');
      expect(form.containsMatchingElement('Please enter a valid email address')).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('does nothing if the form isnt valid', () => {
      const spy = jest.fn();
      const form = mount(<SettingsForm onSubmit={spy} />);
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls.length).toBe(0);
    });

    it('send the username, email and password to the props callback if valid', () => {
      const spy = jest.fn();
      const form = mount(<SettingsForm onSubmit={spy} />);
      form.find('input').at(0).simulate('change', { target: { value: 'foobar' } });
      form.find('input').at(1).simulate('change', { target: { value: 'foo@hotmail.com' } });
      form.find('input').at(2).simulate('change', { target: { value: 'foobar' } });
      form.find('button').at(0).simulate('submit');
      expect(spy.mock.calls[0]).toEqual(['foobar', 'foo@hotmail.com', 'foobar']);
    });

    it('dont send the username, email and password if input are not valid', () => {
      const spy = jest.fn();
      const form = mount(<SettingsForm onSubmit={spy} />);
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
      const form = mount(<SettingsForm isLoading />);
      expect(form.find('button').at(0).find('Spinner').length).toBe(1);
    });
  });

  describe('currentUser', () => {
    it('prepopulate the form if currentUser is passed by props', () => {
      const user = {
        username: 'foo',
        email: 'foo@bar.com',
        password: 'bar',
      };
      const form = mount(<SettingsForm currentUser={user} />);
      expect(form.find('input').at(0).props().value).toBe('foo');
      expect(form.find('input').at(1).props().value).toBe('foo@bar.com');
      expect(form.find('input').at(2).props().value).toBe('');
    });
  });

  describe('serverErrors', () => {
    it('show username is already taken when passed by props', () => {
      const errors = { username: { msg: 'Is already taken' } };
      const form = mount(<SettingsForm errors={errors} />);
      expect(form.containsMatchingElement('Is already taken')).toBe(true);
    });

    it('show email is already taken when passed by props', () => {
      const errors = { email: { msg: 'Is already taken' } };
      const form = mount(<SettingsForm errors={errors} />);
      expect(form.containsMatchingElement('Is already taken')).toBe(true);
    });
  });
});
