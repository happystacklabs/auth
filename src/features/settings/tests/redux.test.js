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
    describe('SETTINGS', () => {
      it('should create an action SETTINGS_SAVE_START', () => {
        const expectedAction = { type: redux.SETTINGS_SAVE_START };
        expect(redux.settingsSaveStart()).toEqual(expectedAction);
      });

      it('should create an action SETTINGS_SAVE_SUCCESS', () => {
        const expectedAction = { type: redux.SETTINGS_SAVE_SUCCESS, response: 'foo' };
        expect(redux.settingsSaveSuccess('foo')).toEqual(expectedAction);
      });

      it('should create an action SETTINGS_SAVE_FAIL', () => {
        const expectedAction = { type: redux.SETTINGS_SAVE_FAIL, error: 'bar' };
        expect(redux.settingsSaveFail('bar')).toEqual(expectedAction);
      });

      it('creates SETTINGS_SAVE_FAIL after failing to post login', () => {
        const errors = {errors: 'fail'};
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 422,
            response: errors,
          });
        });
        const expectedActions = [
          { type: redux.SETTINGS_SAVE_START },
          { type: redux.SETTINGS_SAVE_FAIL, error: 'fail' },
        ];
        const store = mockStore({});
        return store.dispatch(redux.save('foo', 'foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates SETTINGS_SAVE_SUCCESS after success post login', () => {
        const payload = {data: 'success'};
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = [
          { type: redux.SETTINGS_SAVE_START },
          { type: redux.SETTINGS_SAVE_SUCCESS, response: payload },
        ];
        const store = mockStore({});
        return store.dispatch(redux.save('foo', 'foo@bar.com', 'foobar')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.settingsReducer(undefined, {});
      const expectedState = {};
      expect(reducer).toEqual(expectedState);
    });

    describe('SETTINGS', () => {
      it('should handle SETTINGS_SAVE_START', () => {
        expect(
          redux.settingsReducer([], { type: redux.SETTINGS_SAVE_START })
        ).toEqual(
          { inProgress: true }
        );
      });

      it('should handle SETTINGS_SAVE_FAIL', () => {
        expect(
          redux.settingsReducer({ inProgress: true }, { type: redux.SETTINGS_SAVE_FAIL, error: 'foo' })
        ).toEqual(
          { inProgress: false, errors: 'foo' }
        );
      });

      it('should handle SETTINGS_SAVE_SUCCESS', () => {
        expect(
          redux.settingsReducer({ inProgress: true }, { type: redux.SETTINGS_SAVE_SUCCESS })
        ).toEqual(
           { inProgress: false }
        );
      });
    });
  });
});
