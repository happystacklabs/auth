import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Settings } from '../containers/Settings';
import { SettingsAvatar } from '../components/SettingsAvatar';
import { App } from '../../app/containers/App';
import localStorageMock from '../../../__mocks__/localStorage';
import { store } from '../../../store';


window.localStorage = localStorageMock;

describe('Settings', () => {
  describe('Route', () => {
    it('redirect to /login when not loggued in', () => {
      const app = mount((
        <Provider store={store}>
          <Router initialEntries={['/settings']}>
            <App onLoad={() => {}} appLoaded />
          </Router>
        </Provider>
      ));
      expect(app.containsMatchingElement(<h1>Login</h1>)).toBe(true);
    });
  });

  describe('onUnload', () => {
    it('call the props onOnload when the component unmount', () => {
      const spy = jest.fn();
      const current = { username: 'foo' };
      const settings = mount(<Router><Settings currentUser={current} onUnload={spy} /></Router>);
      expect(spy.mock.calls.length).toBe(0);
      settings.unmount();
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe('Avatar', () => {
    it('render in the settings', () => {
      const settings = shallow(<Settings />);
      expect(settings.containsMatchingElement(<SettingsAvatar />)).toBe(true);
    });
  });
});
