import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedApp, { App } from '../containers/App';
import Navbar from '../components/Navbar';
import { MemoryRouter as Router } from 'react-router-dom';
import localStorageMock from '../../../__mocks__/localStorage';
import { Provider } from 'react-redux';
import { store } from '../../../store';


window.localStorage = localStorageMock;

jest.mock('../../../agent');
import agent from '../../../agent';


describe('App', () => {
  it('renders Navigation', () => {
    const app = shallow(
      <App onLoad={()=>{}}/>
    );
    expect(app.containsMatchingElement(<Navbar/>)).toBe(true);
  });

  describe('onLoad()', () => {
    it('call onLoad when component will mount', () => {
      const spy = jest.fn();
      const app = mount(
        <Router>
          <App onLoad={spy}/>
        </Router>
      );
      expect(spy.mock.calls.length).toBe(1);
    });

    it('doesnt set the token to agent if token doesnt exists in localStorage', () => {
      agent.setToken = jest.fn();
      window.localStorage.setItem('jwt', '');
      expect(agent.setToken.mock.calls.length).toBe(0);
      const app = mount(
        <Router>
          <App onLoad={()=>{}}/>
        </Router>
      );
      expect(agent.setToken.mock.calls.length).toBe(0);
    });

    it('set the token to agent if token exists in localStorage', () => {
      agent.setToken = jest.fn();
      const spy = jest.fn();
      window.localStorage.setItem('jwt', 'foo');
      expect(agent.setToken.mock.calls.length).toBe(0);
      const app = mount(
        <Router>
          <App onLoad={spy}/>
        </Router>
      );
      expect(agent.setToken.mock.calls.length).toBe(1);
      expect(agent.setToken.mock.calls[0][0]).toBe('foo');
    });
  });
});
