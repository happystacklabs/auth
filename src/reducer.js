import { combineReducers } from 'redux';
import auth from './features/auth/redux';
import app from './features/app/redux';


export default combineReducers({
  app,
  auth
});
