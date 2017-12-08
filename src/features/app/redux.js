import {
  PASSWORD_RESET_REDIRECT,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../auth/redux';
import agent from '../../agent';

// constants
export const REDIRECT = 'REDIRECT';
export const APP_LOAD_START = 'APP_LOAD_START';
export const APP_LOAD_FAIL = 'APP_LOAD_FAIL';
export const APP_LOAD_SUCCESS = 'APP_LOAD_SUCCESS';

// reducers
export function appReducer (state = { token: null }, action) {
  switch (action.type) {
    case APP_LOAD_START:
      return { ...state, appLoaded: false };
    case APP_LOAD_SUCCESS:
      return {
        ...state,
        appLoaded: true,
        currentUser: action.response,
        token: action.token,
      };
    case APP_LOAD_FAIL:
    return {
      ...state,
      appLoaded: true,
      currentUser: null,
      token: null,
    };
    case PASSWORD_RESET_REDIRECT:
      return { ...state, redirectTo: '/password/new' };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGIN_SUCCESS:
      window.localStorage.setItem('jwt', action.response.user.token);
      agent.setToken(action.response.user.token);
      return {
        ...state,
        redirectTo: '/',
        token: action.response.user.token,
        currentUser: action.response.user
      };
    case LOGOUT:
      window.localStorage.setItem('jwt', '');
      agent.setToken(null);
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    default:
      return state;
  }
}

// actions
export function redirect() {
  return { type: REDIRECT };
}

export function appLoad(token) {
  return function (dispatch) {
    dispatch(appLoadStart());
    if (token) {
      return agent.Auth.current().then(
        (response) => {
          dispatch(appLoadSuccess(response.data.user, token));
        },
        (error) => {
          dispatch(appLoadFail());
      });
    } else {
      dispatch(appLoadSuccess(null, null));
    }
  };
}

export function appLoadStart() {
    return { type: APP_LOAD_START };
}

export function appLoadSuccess(response, token) {
    return { type: APP_LOAD_SUCCESS, response, token };
}

export function appLoadFail() {
    return { type: APP_LOAD_FAIL };
}

export default appReducer;
