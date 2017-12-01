// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';
export const AUTH_FIELD_UPDATE = 'AUTH_FIELD_UPDATE';

// reducers
const defaultState = {};

export function authReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
  return state;
};

// actions
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT }
}

export default authReducer;
