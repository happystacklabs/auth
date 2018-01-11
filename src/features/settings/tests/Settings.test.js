import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Settings } from '../containers/Settings';
import { App } from '../../app/containers/App';
import localStorageMock from '../../../__mocks__/localStorage';
import { store } from '../../../store';


window.localStorage = localStorageMock;

describe('Settings', () => {
  describe('Route', () => {
    it('render Dashboard on /dashboard', () => {
      const currentUser = { username: 'foo' };
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/settings']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<Settings />)).toBe(true);
    });

    it('redirect to /login when not loggued in', () => {
      const currentUser = undefined;
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/settings']}>
            <App onLoad={() => {}} currentUser={currentUser} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(true);
    });
  });

  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const settings = mount(<Router><Settings onUnload={spy} /></Router>);
      expect(spy.mock.calls.length).toBe(0);
      settings.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
