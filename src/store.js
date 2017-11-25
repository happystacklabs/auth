import { createStore, combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';


const reducer = combineReducers({
  auth,
  common
});

export const store = createStore(reducer);
