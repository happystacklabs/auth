import {
  REDIRECT_PASSWORD_RESET,
  REDIRECT
} from '../constants/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case REDIRECT_PASSWORD_RESET:
      return { ...state, redirectTo: '/password/new' };
    case REDIRECT:
      return { ...state, redirectTo: null };
  }
  return state;
}
