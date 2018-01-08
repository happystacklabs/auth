import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Settings from '../containers/Settings';
import { App } from '../../app/containers/App';
import localStorageMock from '../../../__mocks__/localStorage';
import { store } from '../../../store';


window.localStorage = localStorageMock;

describe('Settings', () => {
  describe('Route', () => {
    it('render Settings on /settings', () => {
      const app = mount((
        <Provider store={store}>
          <MemoryRouter initialEntries={['/settings']}>
            <App onLoad={() => {}} appLoaded />
          </MemoryRouter>
        </Provider>
      ));
      expect(app.containsMatchingElement(<Settings />)).toBe(true);
    });
  });
});
