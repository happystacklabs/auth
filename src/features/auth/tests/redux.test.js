import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as redux from '../redux';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('redux', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  //----------------------------------------------------------------------------
  //  ACTION
  //----------------------------------------------------------------------------
  describe('action', () => {
    describe('LOGIN', () => {
      it('should create an action LOGIN_START', () => {
        const expectedAction = { type: redux.LOGIN_START };
        expect(redux.loginStart()).toEqual(expectedAction);
      });

      it('should create an action LOGIN_SUCCESS', () => {
        const expectedAction = { type: redux.LOGIN_SUCCESS, response: 'foo' };
        expect(redux.loginSuccess('foo')).toEqual(expectedAction);
      });

      it('should create an action LOGIN_FAIL', () => {
        const expectedAction = { type: redux.LOGIN_FAIL, error: 'bar' };
        expect(redux.loginFail('bar')).toEqual(expectedAction);
      });

      it('creates LOGIN_FAIL after failing to post login', () => {
        const errors = { errors: 'fail' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 422,
            response: errors,
          });
        });
        const expectedActions = [
          { type: redux.LOGIN_START },
          { type: redux.LOGIN_FAIL, error: 'fail' },
        ];
        const store = mockStore({});
        return store.dispatch(redux.login('foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates LOGIN_SUCCESS after success post login', () => {
        const payload = { data: 'success' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.LOGIN_START },
          { type: redux.LOGIN_SUCCESS, response: payload },
        ];
        const store = mockStore({});
        return store.dispatch(redux.login('foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('LOGOUT', () => {
      it('should create an action LOGOUT', () => {
        const expectedAction = { type: redux.LOGOUT };
        expect(redux.logout()).toEqual(expectedAction);
      });
    });

    describe('REGISTER', () => {
      it('creates REGISTER_START', () => {
        const expectedAction = { type: redux.REGISTER_START };
        expect(redux.registerStart()).toEqual(expectedAction);
      });
      it('creates REGISTER_FAIL', () => {
        const expectedAction = { type: redux.REGISTER_FAIL };
        expect(redux.registerFail()).toEqual(expectedAction);
      });

      it('creates REGISTER_SUCCESS', () => {
        const expectedAction = { type: redux.REGISTER_SUCCESS, response: 'foo' };
        expect(redux.registerSuccess('foo')).toEqual(expectedAction);
      });

      it('creates REGISTER_SUCCESS after post register', () => {
        const payload = { data: 'success' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.REGISTER_START },
          { type: redux.REGISTER_SUCCESS, response: payload },
        ];
        const store = mockStore({});
        return store.dispatch(redux.register('foo', 'foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates REGISTER_FAIL after failing to post register', () => {
        const errors = { errors: 'fail' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 422,
            response: errors,
          });
        });
        const expectedActions = [
          { type: redux.REGISTER_START },
          { type: redux.REGISTER_FAIL, error: 'fail' },
        ];
        const store = mockStore({});
        return store.dispatch(redux.register('foo', 'foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('PASSWORD_FORGOT', () => {
      it('creates PASSWORD_FORGOT_START', () => {
        const expectedAction = { type: redux.PASSWORD_FORGOT_START };
        expect(redux.passwordForgotStart()).toEqual(expectedAction);
      });

      it('creates PASSWORD_FORGOT_FAIL', () => {
        const expectedAction = { type: redux.PASSWORD_FORGOT_FAIL };
        expect(redux.passwordForgotFail()).toEqual(expectedAction);
      });

      it('creates PASSWORD_FORGOT_SUCCESS', () => {
        const expectedAction = { type: redux.PASSWORD_FORGOT_SUCCESS, response: 'foo' };
        expect(redux.passwordForgotSuccess('foo')).toEqual(expectedAction);
      });

      it('creates PASSWORD_FORGOT_SUCCESS after post passwordForgot', () => {
        const payload = { data: 'success' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.PASSWORD_FORGOT_START },
          { type: redux.PASSWORD_FORGOT_SUCCESS, response: payload },
        ];
        const store = mockStore({});
        return store.dispatch(redux.passwordForgot('foo@bar.com')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates PASSWORD_FORGOT_FAIL after failing to post passwordForgot', () => {
        const errors = { errors: 'fail' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 422,
            response: errors,
          });
        });
        const expectedActions = [
          { type: redux.REGISTER_START },
          { type: redux.REGISTER_FAIL, error: 'fail' },
        ];
        const store = mockStore({});
        return store.dispatch(redux.register('foo', 'foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('PASSWORD_RESET', () => {
      it('creates PASSWORD_RESET_START', () => {
        const expectedAction = { type: redux.PASSWORD_RESET_START };
        expect(redux.passwordResetStart()).toEqual(expectedAction);
      });

      it('creates PASSWORD_RESET_FAIL', () => {
        const expectedAction = { type: redux.PASSWORD_RESET_FAIL };
        expect(redux.passwordResetFail()).toEqual(expectedAction);
      });

      it('creates PASSWORD_RESET_SUCCESS', () => {
        const expectedAction = { type: redux.PASSWORD_RESET_SUCCESS, response: 'foo' };
        expect(redux.passwordResetSuccess('foo')).toEqual(expectedAction);
      });

      it('creates PASSWORD_RESET_SUCCESS after post passwordReset', () => {
        const payload = { data: 'success' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.PASSWORD_RESET_START },
          { type: redux.PASSWORD_RESET_SUCCESS, response: payload },
        ];
        const store = mockStore({});
        return store.dispatch(redux.passwordReset('foobar', 'foobar', 'token')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates PASSWORD_RESET_FAIL after failing to post passwordReset', () => {
        const errors = { errors: 'fail' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 422,
            response: errors,
          });
        });
        const expectedActions = [
          { type: redux.PASSWORD_RESET_START },
          { type: redux.PASSWORD_RESET_FAIL, error: 'fail' },
        ];
        const store = mockStore({});
        return store.dispatch(redux.passwordReset('foobar', 'foobar', 'token')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('LOGIN_PAGE_UNLOADED, PASSWORD_FORGOT_PAGE_UNLOADED, PASSWORD_RESET_PAGE_UNLOADED and REGISTER_PAGE_UNLOADED', () => {
      it('creates LOGIN_PAGE_UNLOADED', () => {
        const expectedAction = { type: redux.LOGIN_PAGE_UNLOADED };
        expect(redux.loginPageUnloaded()).toEqual(expectedAction);
      });

      it('creates REGISTER_PAGE_UNLOADED', () => {
        const expectedAction = { type: redux.REGISTER_PAGE_UNLOADED };
        expect(redux.registerPageUnloaded()).toEqual(expectedAction);
      });

      it('creates PASSWORD_FORGOT_PAGE_UNLOADED', () => {
        const expectedAction = { type: redux.PASSWORD_FORGOT_PAGE_UNLOADED };
        expect(redux.passwordForgotPageUnloaded()).toEqual(expectedAction);
      });

      it('creates PASSWORD_RESET_PAGE_UNLOADED', () => {
        const expectedAction = { type: redux.PASSWORD_RESET_PAGE_UNLOADED };
        expect(redux.passwordResetPageUnloaded()).toEqual(expectedAction);
      });
    });
  });

  //----------------------------------------------------------------------------
  //  REDUCERS
  //----------------------------------------------------------------------------
  describe('reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.authReducer(undefined, {});
      const expectedState = {};
      expect(reducer).toEqual(expectedState);
    });

    describe('LOGIN', () => {
      it('should handle LOGIN_START', () => {
        expect((
          redux.authReducer([], { type: redux.LOGIN_START })
        )).toEqual({ inProgress: true });
      });

      it('should handle LOGIN_FAIL', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.LOGIN_FAIL, error: 'foo' })
        )).toEqual({ inProgress: false, errors: 'foo' });
      });

      it('should handle LOGIN_SUCCESS', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.LOGIN_SUCCESS })
        )).toEqual({ inProgress: false, errors: {} });
      });
    });

    describe('REGISTER', () => {
      it('should handle REGISTER_START', () => {
        expect((
          redux.authReducer([], { type: redux.REGISTER_START })
        )).toEqual({ inProgress: true });
      });

      it('should handle REGISTER_FAIL', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.REGISTER_FAIL, error: 'foo' })
        )).toEqual({ inProgress: false, errors: 'foo' });
      });

      it('should handle REGISTER_SUCCESS', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.REGISTER_SUCCESS })
        )).toEqual({ inProgress: false, errors: {} });
      });
    });

    describe('PASSWORD_FORGOT', () => {
      it('should handle PASSWORD_FORGOT_START', () => {
        expect((
          redux.authReducer([], { type: redux.PASSWORD_FORGOT_START })
        )).toEqual({ inProgress: true });
      });

      it('should handle PASSWORD_FORGOT_FAIL', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.PASSWORD_FORGOT_FAIL, error: 'foo' })
        )).toEqual({ inProgress: false, errors: 'foo' });
      });

      it('should handle PASSWORD_FORGOT_SUCCESS', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.PASSWORD_FORGOT_SUCCESS })
        )).toEqual({ inProgress: false, emailSent: true, errors: {} });
      });
    });

    describe('PASSWORD_RESET', () => {
      it('should handle PASSWORD_RESET_START', () => {
        expect((
          redux.authReducer([], { type: redux.PASSWORD_RESET_START })
        )).toEqual({ inProgress: true });
      });

      it('should handle PASSWORD_RESET_FAIL', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.PASSWORD_RESET_FAIL, error: 'foo' })
        )).toEqual({ inProgress: false, errors: 'foo' });
      });

      it('should handle PASSWORD_RESET_SUCCESS', () => {
        expect((
          redux.authReducer({ inProgress: true }, { type: redux.PASSWORD_RESET_SUCCESS })
        )).toEqual({ inProgress: false, passwordReset: true, errors: {} });
      });
    });

    describe('LOGIN_PAGE_UNLOADED, PASSWORD_FORGOT_PAGE_UNLOADED, PASSWORD_RESET_PAGE_UNLOADED and REGISTER_PAGE_UNLOADED', () => {
      it('should handle LOGIN_PAGE_UNLOADED', () => {
        expect((
          redux.authReducer({ errors: {} }, { type: redux.LOGIN_PAGE_UNLOADED })
        )).toEqual({});
      });

      it('should handle REGISTER_PAGE_UNLOADED', () => {
        expect((
          redux.authReducer({ errors: {} }, { type: redux.REGISTER_PAGE_UNLOADED })
        )).toEqual({});
      });

      it('should handle PASSWORD_FORGOT_PAGE_UNLOADED', () => {
        expect((
          redux.authReducer({ errors: {} }, { type: redux.PASSWORD_FORGOT_PAGE_UNLOADED })
        )).toEqual({});
      });

      it('should handle PASSWORD_RESET_PAGE_UNLOADED', () => {
        expect((
          redux.authReducer({ errors: {} }, { type: redux.PASSWORD_RESET_PAGE_UNLOADED })
        )).toEqual({});
      });
    });
  });
});
