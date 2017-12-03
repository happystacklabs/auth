import React from 'react';
import ReactDOM from 'react-dom';
import * as redux from '../redux';
import { promiseMiddleware } from '../../../middleware';
import configureMockStore from 'redux-mock-store'


const mockStore = configureMockStore([promiseMiddleware]);

describe('redux', () => {
  describe('action', () => {
    beforeEach(function(){
    });

    describe('login()', () => {
      const type = redux.LOGIN;
      const store = mockStore({});

      it('return an action with a failing payload', () => {
        const email = 'foo@bar.com';
        const password = 'foobar';
        const payload = {
          errors: {
            'email or password': ['is invalid'],
          }
        };

        const expectedAction = {
          type: type,
          payload: payload,
        };
        // console.log(agent.Auth.login.mock.calls);
        // const action = redux.login(email, password);
        // expect(action).toEqual(expectedAction);
        console.log(redux.login(email, password));
        console.log(store.dispatch(redux.login(email, password)));
        store.dispatch(redux.login(email, password)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });
    });

    describe('async_start()', () => {
      it('should create an async start action with the subtype', () => {

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
      it('should inProgress to null in the state', () => {

      });
    });
  });
});
