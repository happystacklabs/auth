import agent from '../../agent';

// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';
export const AUTH_FIELD_UPDATE = 'AUTH_FIELD_UPDATE';
export const LOGIN = 'LOGIN';
export const ASYNC_START = 'ASYNC_START';

// reducers
const defaultState = {};

export function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === 'REGISTER') {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }
  return state;
};

// actions
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT };
}

export function login(email, password) {
  return { type: LOGIN, payload: agent.Auth.login(email, password) };
}

export function async_start(type) {
  return { type: ASYNC_START, subtype: type };
}

export default authReducer;
