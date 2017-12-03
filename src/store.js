import reducer from './reducer';
import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const store = createStore(reducer, applyMiddleware(logger, thunk));
