import * as redux from '../redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('redux', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

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
        const errors = {errors: 'fail'};
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
        const payload = {data: 'success'};
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
        const payload = {data: 'success'};
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
        const errors = {errors: 'fail'};
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
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.authReducer(undefined, {});
      const expectedState = {};
      expect(reducer).toEqual(expectedState);
    });

    describe('LOGIN', () => {
      it('should handle LOGIN_START', () => {
        expect(
          redux.authReducer([], { type: redux.LOGIN_START })
        ).toEqual(
          { inProgress: true }
        );
      });

      it('should handle LOGIN_FAIL', () => {
        expect(
          redux.authReducer({ inProgress: true }, { type: redux.LOGIN_FAIL, error: 'foo' })
        ).toEqual(
          { inProgress: false, errors: 'foo' }
        );
      });

      it('should handle LOGIN_SUCCESS', () => {
        expect(
          redux.authReducer({ inProgress: true }, { type: redux.LOGIN_SUCCESS })
        ).toEqual(
           { inProgress: false }
        );
      });
    });

    describe('REGISTER', () => {
      it('should handle REGISTER_START', () => {
        expect(
          redux.authReducer([], { type: redux.REGISTER_START })
        ).toEqual(
          { inProgress: true }
        );
      });

      it('should handle REGISTER_FAIL', () => {
        expect(
          redux.authReducer({ inProgress: true }, { type: redux.REGISTER_FAIL, error: 'foo' })
        ).toEqual(
          { inProgress: false, errors: 'foo' }
        );
      });

      it('should handle REGISTER_SUCCESS', () => {
        expect(
          redux.authReducer({ inProgress: true }, { type: redux.REGISTER_SUCCESS })
        ).toEqual(
           { inProgress: false }
        );
      });
    });
  });
});
