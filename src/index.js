import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './features/app/containers/App';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';
import './shared/styles/index.css';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'),
);


registerServiceWorker();
