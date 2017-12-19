import React from 'react';
import Dashboard from './Dashboard';
import {App} from '../../features/app/containers/App';
import {MemoryRouter} from 'react-router-dom';
import localStorageMock from '../../__mocks__/localStorage';
import {mount} from 'enzyme';


window.localStorage = localStorageMock;

describe('Dashboard', () => {
  describe('Route', () => {
    it('render Dashboard on /dashboard', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App onLoad={()=>{}} appLoaded />
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Dashboard />)).toBe(true);
    });
  });
});
