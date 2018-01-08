import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../features/app/containers/App';
import localStorageMock from '../../__mocks__/localStorage';
import Dashboard from './Dashboard';


window.localStorage = localStorageMock;

describe('Dashboard', () => {
  describe('Route', () => {
    it('render Dashboard on /dashboard', () => {
      const app = mount((
        <MemoryRouter initialEntries={['/dashboard']}>
          <App onLoad={() => {}} appLoaded />
        </MemoryRouter>
      ));
      expect(app.containsMatchingElement(<Dashboard />)).toBe(true);
    });
  });
});
