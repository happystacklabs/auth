import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';


const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk);
  }
  return applyMiddleware(logger, thunk);
};

export const store = createStore(
  reducer,
  getMiddleware(),
);


export default store;
