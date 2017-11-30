import React from 'react';
import ReactDOM from 'react-dom';
import * as redux from '../redux';



describe('auth', () => {
  describe('auth::action', () => {
    describe('authFieldUpdate', () => {
      const type = redux.AUTH_FIELD_UPDATE;

      it('should create an action to update the email field', () => {
        const type = redux.AUTH_FIELD_UPDATE;
        const value = 'foo@bar.com';
        const key = 'email';
        const expectedAction = {
          type: type,
          key: key,
          value,
        }
        const action = redux.authFieldUpdate(key, value);
        expect(action).toEqual(expectedAction);
      });

      it('should create an action to update the password field', () => {
        const value = 'foo';
        const key = 'password';
        const expectedAction = {
          type: type,
          key: key,
          value,
        }
        const action = redux.authFieldUpdate(key, value);
        expect(action).toEqual(expectedAction);
      });
    });
  });

  describe('auth::reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.authReducer(undefined, {});
      const expectedState = {email: ''};
      expect(reducer).toEqual(expectedState);
    });

    it('should handle AUTH_FIELD_UPDATE with email', () => {
      const value = 'foo@bar.com';
      const key = 'email';
      const action = redux.authFieldUpdate(key, value);
      const reducer = redux.authReducer({}, action);
      const expectedState = {email: 'foo@bar.com'};
      expect(reducer).toEqual(expectedState);
    });

    it('should handle AUTH_FIELD_UPDATE with email', () => {
      const value = 'foo';
      const key = 'password';
      const action = redux.authFieldUpdate(key, value);
      const reducer = redux.authReducer({}, action);
      const expectedState = {password: 'foo'};
      expect(reducer).toEqual(expectedState);
    });
  });
});
