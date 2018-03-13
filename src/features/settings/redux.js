import agent from '../../agent';


//------------------------------------------------------------------------------
//  CONSTANTS
//------------------------------------------------------------------------------
export const SETTINGS_SAVE_START = 'SETTINGS_SAVE_START';
export const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS';
export const SETTINGS_SAVE_FAIL = 'SETTINGS_SAVE_FAIL';

export const SETTINGS_PAGE_UNLOADED = 'SETTINGS_PAGE_UNLOADED';

export const SETTINGS_AVATAR_START = 'SETTINGS_AVATAR_START';
export const SETTINGS_AVATAR_SUCCESS = 'SETTINGS_AVATAR_SUCCESS';
export const SETTINGS_AVATAR_FAIL = 'SETTINGS_AVATAR_FAIL';

export const REMOVE_AVATAR_START = 'REMOVE_AVATAR_START';
export const REMOVE_AVATAR_SUCCESS = 'REMOVE_AVATAR_SUCCESS';
export const REMOVE_AVATAR_FAIL = 'REMOVE_AVATAR_FAIL';


//------------------------------------------------------------------------------
//  REDUCER
//------------------------------------------------------------------------------
const defaultState = {};


export function settingsReducer(state = defaultState, action) {
  switch (action.type) {
    case SETTINGS_SAVE_START:
    case SETTINGS_AVATAR_START:
    case REMOVE_AVATAR_START:
      return { ...state, inProgress: true };
    case SETTINGS_SAVE_SUCCESS:
      return { ...state, inProgress: false };
    case SETTINGS_AVATAR_SUCCESS:
    case REMOVE_AVATAR_SUCCESS:
      return { ...state, inProgress: false, avatarSuccess: true };
    case SETTINGS_SAVE_FAIL:
    case SETTINGS_AVATAR_FAIL:
    case REMOVE_AVATAR_FAIL:
      return { ...state, inProgress: false, errors: action.errors };
    case SETTINGS_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
}


//------------------------------------------------------------------------------
//  ACTIONS
//------------------------------------------------------------------------------
export function settingsSaveStart() {
  return { type: SETTINGS_SAVE_START };
}

export function settingsSaveSuccess(response) {
  return { type: SETTINGS_SAVE_SUCCESS, response };
}

export function settingsSaveFail(errors) {
  return { type: SETTINGS_SAVE_FAIL, errors };
}

export function save(username, email, password) {
  return (dispatch) => {
    dispatch(settingsSaveStart());
    return agent.Auth.save(username, email, password).then(
      (response) => {
        dispatch(settingsSaveSuccess(response.data));
      },
      (error) => {
        dispatch(settingsSaveFail(error.response.data.errors));
      },
    );
  };
}


export function settingsAvatarStart() {
  return { type: SETTINGS_AVATAR_START };
}

export function settingsAvatarSuccess(response) {
  return { type: SETTINGS_AVATAR_SUCCESS, response };
}

export function settingsAvatarFail(errors) {
  return { type: SETTINGS_AVATAR_FAIL, errors };
}

export function uploadAvatar(image) {
  return (dispatch) => {
    dispatch(settingsAvatarStart());
    return agent.Auth.uploadAvatar(image).then(
      (response) => {
        dispatch(settingsAvatarSuccess(response.data));
      },
      (error) => {
        dispatch(settingsAvatarFail(error.response.data.errors));
      },
    );
  };
}


export function removeAvatarStart() {
  return { type: REMOVE_AVATAR_START };
}

export function removeAvatarSuccess(response) {
  return { type: REMOVE_AVATAR_SUCCESS, response };
}

export function removeAvatarFail(errors) {
  return { type: REMOVE_AVATAR_FAIL, errors };
}

export function removeAvatar() {
  return (dispatch) => {
    dispatch(removeAvatarStart());
    return agent.Auth.removeAvatar().then(
      (response) => {
        dispatch(removeAvatarSuccess(response.data));
      },
      (error) => {
        dispatch(removeAvatarFail(error.response.data.errors));
      },
    );
  };
}


export function settingsPageUnloaded() {
  return { type: SETTINGS_PAGE_UNLOADED };
}


export default settingsReducer;
