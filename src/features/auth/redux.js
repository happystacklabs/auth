// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';
export const AUTH_FIELD_UPDATE = 'AUTH_FIELD_UPDATE';

// reducers
const defaultState = {
  email: '',
};

export function authReducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_FIELD_UPDATE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
  return state;
};

// actions
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT }
}

export function authFieldUpdate(key, value) {
  return { type: AUTH_FIELD_UPDATE, key: key, value }
}

export default authReducer;
