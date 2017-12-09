import agent from '../../agent';

// constants
export const SETTINGS_SAVE_START = 'SETTINGS_SAVE_START';
export const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS';
export const SETTINGS_SAVE_FAIL = 'SETTINGS_SAVE_FAIL';

// reducers
const defaultState = {};

export function settingsReducer(state = defaultState, action) {
  switch (action.type) {
    case SETTINGS_SAVE_START:
      return { ...state, inProgress: true };
      break;
    case SETTINGS_SAVE_SUCCESS:
      return { ...state, inProgress: false };
      break;
    case SETTINGS_SAVE_FAIL:
      return { ...state, inProgress: false, errors: action.error };
      break;
    default:
      return state;
  }
  return state;
}

// actions
export function save(username, email, password) {
  return function (dispatch) {
    dispatch(settingsSaveStart());
    return agent.Auth.save(username, email, password).then(
      (response) => {
        dispatch(settingsSaveSuccess(response.data));
      },
      (error) => {
        dispatch(settingsSaveFail(error.response.data.errors));
    });
  }
}

export function settingsSaveStart() {
  return { type: SETTINGS_SAVE_START };
}

export function settingsSaveSuccess(response) {
  return { type: SETTINGS_SAVE_SUCCESS, response: response };
}

export function settingsSaveFail(error) {
  return { type: SETTINGS_SAVE_FAIL, error: error };
}

export default settingsReducer;
