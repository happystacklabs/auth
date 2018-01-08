import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Settings.css';
import { SettingsForm } from '../components/SettingsForm';
import { save } from '../redux';


const mapStateToProps = state => ({
  ...state.auth,
  currentUser: state.app.currentUser,
});


const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(save(username, email, password));
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
};


const defaultProps = {
  onSubmit: undefined,
  inProgress: false,
  currentUser: null,
};


function Settings(props) {
  return (
    <div>
      <h1>Settings</h1>
      <div className="panel settings_panel">
        <div className="panel_content">
          <SettingsForm
            onSubmit={props.onSubmit}
            isLoading={props.inProgress}
            currentUser={props.currentUser}
          />
        </div>
      </div>
    </div>
  );
}


Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
