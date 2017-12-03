import agent from '../../agent';

// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

// reducers
const defaultState = {};

export function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, inProgress: true };
      break;
    case LOGIN_SUCCESS:
      return { ...state, inProgress: false };
      break;
    case LOGIN_FAIL:
      return { ...state, inProgress: false, errors:true, errors: action.error };
      break;
    default:
      return state;
  }
  return state;
}

// actions
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT };
}

export function loginStart() {
  return { type: LOGIN_START };
}

export function loginSuccess(payload) {
  return { type: LOGIN_SUCCESS, response: payload };
}

export function loginFail(error) {
  return { type: LOGIN_FAIL, error: error };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch(loginStart());
    return agent.Auth.login(email, password).then(
      (response) => {
        dispatch(loginSuccess(response.data));
      },
      (error) => {
        dispatch(loginFail(error.response.data.errors));
    });
  };
}


export default authReducer;
