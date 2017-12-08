import {
  PASSWORD_RESET_REDIRECT,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../auth/redux';
import agent from '../../agent';

// constants
export const REDIRECT = 'REDIRECT';

// reducers
export function appReducer (state = { token: null }, action) {
  switch (action.type) {
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
  return { type: REDIRECT }
}

export default appReducer;
