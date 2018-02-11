import agent from '../../agent';


//------------------------------------------------------------------------------
//  CONSTANTS
//------------------------------------------------------------------------------
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const PASSWORD_FORGOT_START = 'PASSWORD_FORGOT_START';
export const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_FAIL = 'PASSWORD_FORGOT_FAIL';

export const PASSWORD_RESET_START = 'PASSWORD_RESET_START';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL';

export const LOGIN_PAGE_UNLOADED = 'LOGIN_PAGE_UNLOADED';
export const REGISTER_PAGE_UNLOADED = 'REGISTER_PAGE_UNLOADED';
export const PASSWORD_FORGOT_PAGE_UNLOADED = 'PASSWORD_FORGOT_PAGE_UNLOADED';
export const PASSWORD_RESET_PAGE_UNLOADED = 'PASSWORD_RESET_PAGE_UNLOADED';


//------------------------------------------------------------------------------
//  REDUCER
//------------------------------------------------------------------------------
const defaultState = {};


export function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
    case PASSWORD_FORGOT_START:
    case PASSWORD_RESET_START:
      return { ...state, inProgress: true };
    case PASSWORD_FORGOT_SUCCESS:
      return {
        ...state,
        emailSent: true,
        inProgress: false,
        errors: {},
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordReset: true,
        inProgress: false,
        errors: {},
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, inProgress: false, errors: {} };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case PASSWORD_FORGOT_FAIL:
    case PASSWORD_RESET_FAIL:
      return { ...state, inProgress: false, errors: action.error };
    case LOGOUT:
      return { ...state };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
    case PASSWORD_FORGOT_PAGE_UNLOADED:
    case PASSWORD_RESET_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
}


//------------------------------------------------------------------------------
//  ACTIONS
//------------------------------------------------------------------------------
export function passwordResetRedirect() {
  return { type: PASSWORD_RESET_REDIRECT };
}


export function loginStart() {
  return { type: LOGIN_START };
}

export function loginSuccess(response) {
  return { type: LOGIN_SUCCESS, response };
}

export function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(loginStart());
    return agent.Auth.login(email, password).then(
      (response) => {
        dispatch(loginSuccess(response.data));
      },
      (error) => {
        dispatch(loginFail(error.response.data.errors));
      },
    );
  };
}


export function logout() {
  return { type: LOGOUT };
}


export function registerStart() {
  return { type: REGISTER_START };
}

export function registerSuccess(response) {
  return { type: REGISTER_SUCCESS, response };
}

export function registerFail(error) {
  return { type: REGISTER_FAIL, error };
}

export function register(username, email, password) {
  return (dispatch) => {
    dispatch(registerStart());
    return agent.Auth.register(username, email, password).then(
      (response) => {
        dispatch(registerSuccess(response.data));
      },
      (error) => {
        dispatch(registerFail(error.response.data.errors));
      },
    );
  };
}


export function passwordForgotStart() {
  return { type: PASSWORD_FORGOT_START };
}

export function passwordForgotFail(error) {
  return { type: PASSWORD_FORGOT_FAIL, error };
}

export function passwordForgotSuccess(response) {
  return { type: PASSWORD_FORGOT_SUCCESS, response };
}

export function passwordForgot(email) {
  return (dispatch) => {
    dispatch(passwordForgotStart());
    return agent.Auth.passwordForgot(email).then(
      (response) => {
        dispatch(passwordForgotSuccess(response.data));
      },
      (error) => {
        dispatch(passwordForgotFail(error.response.data.errors));
      },
    );
  };
}


export function passwordResetStart() {
  return { type: PASSWORD_RESET_START };
}

export function passwordResetSuccess(response) {
  return { type: PASSWORD_RESET_SUCCESS, response };
}

export function passwordResetFail(error) {
  return { type: PASSWORD_RESET_FAIL, error };
}

export function passwordReset(password, passwordConfirm, token) {
  return (dispatch) => {
    dispatch(passwordResetStart());
    return agent.Auth.passwordReset(password, passwordConfirm, token).then(
      (response) => {
        dispatch(passwordResetSuccess(response.data));
      },
      (error) => {
        dispatch(passwordResetFail(error.response.data.errors));
      },
    );
  };
}


export function loginPageUnloaded() {
  return { type: LOGIN_PAGE_UNLOADED };
}

export function registerPageUnloaded() {
  return { type: REGISTER_PAGE_UNLOADED };
}

export function passwordForgotPageUnloaded() {
  return { type: PASSWORD_FORGOT_PAGE_UNLOADED };
}

export function passwordResetPageUnloaded() {
  return { type: PASSWORD_RESET_PAGE_UNLOADED };
}


export default authReducer;
