import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from '../../features/app/containers/App';
import localStorageMock from '../../__mocks__/localStorage';
import Dashboard from './Dashboard';
import { store } from '../../store';


window.localStorage = localStorageMock;

describe('Dashboard', () => {
  describe('Route', () => {
    it('render Dashboard on /dashboard', () => {
      const currentUser = { username: 'foo' };
      const app = mount((
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </MemoryRouter>
        </Provider>
      ));
      expect(app.containsMatchingElement(<Dashboard />)).toBe(true);
    });

    it('redirect to /login when not loggued in', () => {
      const currentUser = undefined;
      const app = mount((
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </MemoryRouter>
        </Provider>
      ));
      expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(true);
    });
  });
});
