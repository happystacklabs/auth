import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Settings.css';
import { SettingsForm } from '../components/SettingsForm';
import { save, settingsPageUnloaded } from '../redux';


const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.app.currentUser,
});


const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(save(username, email, password));
  },
  onUnload: () => {
    dispatch(settingsPageUnloaded());
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
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
};


const defaultProps = {
  onSubmit: undefined,
  inProgress: false,
  currentUser: null,
  errors: undefined,
  onUnload: undefined,
};


export class Settings extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <div className="panel settings">
          <div className="panel__content">
            <SettingsForm
              onSubmit={this.props.onSubmit}
              isLoading={this.props.inProgress}
              currentUser={this.props.currentUser}
              errors={this.props.errors}
            />
          </div>
        </div>
      </div>
    );
  }
}


Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
