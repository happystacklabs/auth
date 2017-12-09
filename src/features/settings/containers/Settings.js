import React from 'react';
import '../styles/Settings.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import { SettingsForm } from '../components/SettingsForm';
import { save } from '../redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  ...state.auth,
  currentUser: state.app.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(save(username, email, password));
  }
});

class Settings extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    inProgress: PropTypes.bool,
  };

  render() {
    return (
      <div>
        <h1>Settings</h1>
          <div className='panel settings_panel'>
            <div className='panel_content'>
              <SettingsForm
                onSubmit={this.props.onSubmit}
                isLoading={this.props.inProgress}
                currentUser={this.props.currentUser}
              />
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
