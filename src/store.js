import reducer from './reducer';
import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';




const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk);
  } else {
    return applyMiddleware(logger, thunk);
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(getMiddleware())
);
