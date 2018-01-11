import agent from '../../agent';


//------------------------------------------------------------------------------
//  CONSTANTS
//------------------------------------------------------------------------------
export const SETTINGS_SAVE_START = 'SETTINGS_SAVE_START';
export const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS';
export const SETTINGS_SAVE_FAIL = 'SETTINGS_SAVE_FAIL';

export const SETTINGS_PAGE_UNLOADED = 'SETTINGS_PAGE_UNLOADED';


//------------------------------------------------------------------------------
//  REDUCER
//------------------------------------------------------------------------------
const defaultState = {};


export function settingsReducer(state = defaultState, action) {
  switch (action.type) {
    case SETTINGS_SAVE_START:
      return { ...state, inProgress: true };
    case SETTINGS_SAVE_SUCCESS:
      return { ...state, inProgress: false };
    case SETTINGS_SAVE_FAIL:
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


export function settingsPageUnloaded() {
  return { type: SETTINGS_PAGE_UNLOADED };
}


export default settingsReducer;
