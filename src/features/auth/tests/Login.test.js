import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedLogin, { Login } from '../containers/Login';
import { MemoryRouter, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import * as redux from '../redux';
import { Provider } from 'react-redux';


describe('Login', () => {
  it('render create account Link', () => {
    const login = shallow(
      <Login/>
    );
    expect(login.containsMatchingElement(<Link to='/register'>Create an account</Link>)).toBe(true);
  });
});
