import React from 'react';
import {Login} from '../containers/Login';
import {App} from '../../app/containers/App';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import {Register} from '../containers/Register';
import PasswordReset from '../containers/PasswordReset';
import localStorageMock from '../../../__mocks__/localStorage';
import {mount} from 'enzyme';


window.localStorage = localStorageMock;

describe('auth::routes', () => {
  describe('Login', () => {
    it('render Login on /login', () => {
      const app = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App onLoad={()=>{}} appLoaded />
          </MemoryRouter>
        </Provider>
      );
      expect(app.containsMatchingElement(<Login />)).toBe(true);
    });
  });

  describe('Register', () => {
    it('render Register on /register', () => {
      const app = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/register']}>
            <App onLoad={()=>{}} appLoaded />
          </MemoryRouter>
        </Provider>
      );
      expect(app.containsMatchingElement(<Register />)).toBe(true);
    });
  });

  describe('PasswordReset', () => {
    it('render PasswordReset on /password/new', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/password/new']}>
          <App onLoad={()=>{}} appLoaded />
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<PasswordReset />)).toBe(true);
    });
  });
});
