import React from 'react';
import ReactDOM from 'react-dom';
import * as redux from '../redux';



describe('redux', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      const reducer = redux.authReducer(undefined, {});
      const expectedState = {};
      expect(reducer).toEqual(expectedState);
    });
  });
});
