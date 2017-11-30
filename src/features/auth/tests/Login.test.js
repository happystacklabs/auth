import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../containers/Login';
import { MemoryRouter, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)


describe('Login', () => {
  it('render create account Link', () => {
    const app = mount(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    );
    expect(app.containsMatchingElement(<Link to='/register'>Create an account</Link>)).toBe(true);
  });

  describe('Forgot Password?', () => {
  });

  describe('dispatch', () => {
    it('dispatch an action when onChangeEmail()', () => {
      const login = shallow(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      ).dive();
      login.find('input').at(1).simulate('click');
    });
  });
});
