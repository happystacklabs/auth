import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { App } from '../../features/app/containers/App';
import { MemoryRouter } from 'react-router-dom';
import localStorageMock from '../../__mocks__/localStorage';


window.localStorage = localStorageMock;

describe('Home', () => {
  describe('Route', () => {
    it('render Home on /', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/']}>
          <App onLoad={()=>{}}/>
        </MemoryRouter>
      );
      expect(app.containsMatchingElement(<Home/>)).toBe(true);
    });
  });
});
