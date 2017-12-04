import {
  PASSWORD_RESET_REDIRECT,
  LOGIN_SUCCESS
} from '../auth/redux';

// constants
export const REDIRECT = 'REDIRECT';

// reducers
export function appReducer (state = {}, action) {
  switch (action.type) {
    case PASSWORD_RESET_REDIRECT:
      return { ...state, redirectTo: '/password/new' };
    case REDIRECT:
      return { ...state, redirectTo: null };
      case LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: '/',
        token: action.response.user.token,
        currentUser: action.response.user
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
