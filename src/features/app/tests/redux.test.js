import * as redux from '../redux';
import {
  LOGIN_SUCCESS,
  PASSWORD_RESET_REDIRECT
} from '../../auth/redux';


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
      const expectedState = {};
      expect(reducer).toEqual(expectedState);
    });

    it('should handle REDIRECT', () => {
      expect(
        redux.appReducer([], { type: redux.REDIRECT })
      ).toEqual(
        { redirectTo: null }
      );
    });

    it('should handle LOGIN_SUCCESS', () => {
      expect(
        redux.appReducer([], { type: LOGIN_SUCCESS })
      ).toEqual(
        { redirectTo: '/' }
      );
    });

    it('should handle PASSWORD_RESET_REDIRECT', () => {
      expect(
        redux.appReducer([], { type: PASSWORD_RESET_REDIRECT })
      ).toEqual(
        { redirectTo: '/password/new' }
      );
    });

  });
});
