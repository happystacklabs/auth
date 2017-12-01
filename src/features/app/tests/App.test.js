import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../containers/App';
import Navbar from '../components/Navbar';
import { MemoryRouter } from 'react-router-dom';


describe('App', () => {
  it('renders Navigation', () => {
    const app = shallow(
      <App/>
    );
    expect(app.containsMatchingElement(<Navbar/>)).toBe(true);
  });
});
