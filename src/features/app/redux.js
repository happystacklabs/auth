import { PASSWORD_RESET_REDIRECT } from '../auth/redux';

// constants
export const REDIRECT = 'REDIRECT';

// reducers
export default function appReducer (state = {}, action) {
  switch (action.type) {
    case PASSWORD_RESET_REDIRECT:
      return { ...state, redirectTo: '/password/new' };
    case REDIRECT:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
}

// actions
export function redirect() {
  return { type: REDIRECT }
}
