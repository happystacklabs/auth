import reducer from './reducer';
import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';


export const store = createStore(reducer, applyMiddleware(promiseMiddleware));
