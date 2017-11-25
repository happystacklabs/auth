// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';

// reducers
export default function authReducer (state = {email: 'fff'}, action) {
  return state;
};

// actions
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT }
}
