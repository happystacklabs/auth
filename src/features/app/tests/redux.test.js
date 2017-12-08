import * as redux from '../redux';
import {
  LOGIN_SUCCESS,
  PASSWORD_RESET_REDIRECT,
  LOGOUT,
} from '../../auth/redux';
import localStorageMock from '../../../__mocks__/localStorage';
import agent from '../../../agent';


window.localStorage = localStorageMock;

describe('redux', () => {
  describe('action', () => {
    it('should create an action REDIRECT', () => {
      const expectedAction = { type: redux.REDIRECT };
      expect(redux.redirect()).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.appReducer(undefined, {});
      const expectedState = { token: null };
      expect(reducer).toEqual(expectedState);
    });

    it('should handle REDIRECT', () => {
      expect(
        redux.appReducer([], { type: redux.REDIRECT })
      ).toEqual(
        { redirectTo: null }
      );
    });

    it('should handle PASSWORD_RESET_REDIRECT', () => {
      expect(
        redux.appReducer([], { type: PASSWORD_RESET_REDIRECT })
      ).toEqual(
        { redirectTo: '/password/new' }
      );
    });

    describe('LOGIN_SUCCESS', () => {
      it('should handle LOGIN_SUCCESS', () => {
        const response = {
          user: {
            token: 'foo'
          }
        };
        expect(
          redux.appReducer([], { type: LOGIN_SUCCESS, response: response })
        ).toEqual(
          { redirectTo: '/', token: response.user.token, currentUser: response.user }
        );
      });

      it('should set token to agent', () => {
        agent.setToken = jest.fn();
        const response = {
          user: {
            token: 'foo',
          }
        };
        expect(agent.setToken.mock.calls.length).toBe(0);
        redux.appReducer({}, { type: LOGIN_SUCCESS, response: response });
        expect(agent.setToken.mock.calls.length).toBe(1);
        expect(agent.setToken.mock.calls[0][0]).toBe('foo');
      });

      it('should add the token to localStorage', () => {
        window.localStorage.setItem('jwt', '');
        const response = {
          user: {
            token: 'foo',
          }
        };
        expect(window.localStorage.getItem('jwt')).toBe('');
        redux.appReducer({}, { type: LOGIN_SUCCESS, response: response });
        expect(window.localStorage.getItem('jwt')).toBe('foo');
      });
    });

    describe('LOGOUT', () => {
      it('should remove the token from agent', () => {
        agent.setToken = jest.fn();
        expect(agent.setToken.mock.calls.length).toBe(0);
        redux.appReducer({}, { type: LOGOUT });
        expect(agent.setToken.mock.calls.length).toBe(1);
        expect(agent.setToken.mock.calls[0][0]).toBe(null);
      });

      it('should remove the token from localStorage', () => {
        window.localStorage.setItem('jwt', 'token');
        expect(window.localStorage.getItem('jwt')).toBe('token');
        redux.appReducer({}, { type: LOGOUT });
        expect(window.localStorage.getItem('jwt')).toBe('');
      });
    });
  });
});
