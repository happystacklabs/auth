import agent from '../../agent';

// constants
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

// reducers
const defaultState = {};

export function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
      return { ...state, inProgress: true };
      break;
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, inProgress: false };
      break;
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, inProgress: false, errors: action.error };
      break;
    case LOGOUT:
      return { ...state };
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

export function loginSuccess(response) {
  return { type: LOGIN_SUCCESS, response: response };
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

export function logout() {
  return { type: LOGOUT };
}

export function registerStart() {
  return { type: REGISTER_START };
}

export function registerSuccess(response) {
  return { type: REGISTER_SUCCESS, response: response };
}

export function registerFail(error) {
  return { type: REGISTER_FAIL, error: error };
}

export function register(username, email, password) {
  return function (dispatch) {
    dispatch(registerStart());
    return agent.Auth.register(username, email, password).then(
      (response) => {
        dispatch(registerSuccess(response.data));
      },
      (error) => {
        dispatch(registerFail(error.response.data.errors));
    });
  }
}


export default authReducer;
