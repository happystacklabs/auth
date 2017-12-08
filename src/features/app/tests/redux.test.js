import * as redux from '../redux';
import {
  LOGIN_SUCCESS,
  PASSWORD_RESET_REDIRECT,
  LOGOUT,
} from '../../auth/redux';
import localStorageMock from '../../../__mocks__/localStorage';
import agent from '../../../agent';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


window.localStorage = localStorageMock;

describe('redux', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('action', () => {
    it('should create an action REDIRECT', () => {
      const expectedAction = { type: redux.REDIRECT };
      expect(redux.redirect()).toEqual(expectedAction);
    });

    describe('APP_LOAD', () => {
      it('should create an action APP_LOAD_SUCCESS', () => {
        const expectedAction = { type: redux.APP_LOAD_SUCCESS, response: 'foo' };
        expect(redux.appLoadSuccess('foo')).toEqual(expectedAction);
      });

      it('should create an action APP_LOAD_START', () => {
        const expectedAction = { type: redux.APP_LOAD_START };
        expect(redux.appLoadStart()).toEqual(expectedAction);
      });

      it('should create an action APP_LOAD_SUCCESS after getting current user with token', () => {
        const payload = { data: { user: 'foo' } };
        const token = 'foo';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.APP_LOAD_START },
          { type: redux.APP_LOAD_SUCCESS, response: payload.user, token },
        ];
        const store = mockStore({});
        return store.dispatch(redux.appLoad(token)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('should create an action APP_LOAD_SUCCESS when token is null', () => {
        const token = '';
        const expectedActions = [
          { type: redux.APP_LOAD_START },
          { type: redux.APP_LOAD_SUCCESS, response: null, token: null },
        ];
        const store = mockStore({});
        store.dispatch(redux.appLoad(token));
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('should create an action APP_LOAD_FAIL', () => {
        const expectedAction = { type: redux.APP_LOAD_FAIL };
        expect(redux.appLoadFail()).toEqual(expectedAction);
      });
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

    describe('APP_LOAD', () => {
      it('should handle APP_LOAD_START', () => {
        expect(
          redux.appReducer([], { type: redux.APP_LOAD_START })
        ).toEqual(
          { appLoaded: false }
        );
      });

      it('should handle APP_LOAD_SUCCESS with empty user and token', () => {
        const response = null;
        const token = null;
        expect(
          redux.appReducer([], { type: redux.APP_LOAD_SUCCESS, response, token })
        ).toEqual(
          { appLoaded: true, currentUser: response, token: token }
        );
      });

      it('should handle APP_LOAD_SUCCESS with user and token', () => {
        const response = { user: 'foo' };
        const token = 'bar';
        expect(
          redux.appReducer([], { type: redux.APP_LOAD_SUCCESS, response, token })
        ).toEqual(
          { appLoaded: true, currentUser: response, token: token }
        );
      });

      it('should handle APP_LOAD_FAIL', () => {
        const response = null;
        const token = null;
        expect(
          redux.appReducer([], { type: redux.APP_LOAD_FAIL })
        ).toEqual(
          { appLoaded: true, currentUser: response, token: token }
        );
      });
    });
  });
});
