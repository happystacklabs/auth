import React from 'react';
import ReactDOM from 'react-dom';
import './shared/styles/index.css';
import App from './features/app/containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
