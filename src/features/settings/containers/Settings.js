import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Settings.css';
import { SettingsForm } from '../components/SettingsForm';
import { SettingsAvatar } from '../components/SettingsAvatar';
import { save, settingsPageUnloaded, uploadAvatar, removeAvatar } from '../redux';


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
  onUpload: (data) => {
    dispatch(uploadAvatar(data));
  },
  onRemove: () => {
    dispatch(removeAvatar());
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  avatarSuccess: PropTypes.bool,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
    avatar: PropTypes.string,
  }),
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
};


const defaultProps = {
  onSubmit: undefined,
  inProgress: false,
  avatarSuccess: false,
  currentUser: undefined,
  errors: undefined,
  onUnload: undefined,
  onUpload: undefined,
  onRemove: undefined,
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
            <SettingsAvatar
              currentUser={this.props.currentUser}
              onChange={this.props.onUpload}
              success={this.props.avatarSuccess}
              onRemove={this.props.onRemove}
            />
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
