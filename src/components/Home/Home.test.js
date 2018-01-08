import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { App } from '../../features/app/containers/App';
import localStorageMock from '../../__mocks__/localStorage';
import Home from './Home';


window.localStorage = localStorageMock;


describe('Home', () => {
  describe('Route', () => {
    it('render Home on /', () => {
      const app = mount((
        <MemoryRouter initialEntries={['/']}>
          <App onLoad={() => {}} appLoaded />
        </MemoryRouter>
      ));
      expect(app.containsMatchingElement(<Home />)).toBe(true);
    });
  });
});
