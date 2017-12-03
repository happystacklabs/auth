import React from 'react';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import PropTypes from 'prop-types';
import {
  passwordResetRedirect,
  login,
} from '../redux';
import '../styles/Login.css';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirectPasswordReset: () => {
    dispatch(passwordResetRedirect());
  },
  onSubmit: (email, password) => {
    dispatch(login(email, password));
  }
});

export class Login extends React.Component {
  static propTypes = {
    onRedirectPasswordReset: PropTypes.func,
    onSubmit: PropTypes.func,
    inProgress: PropTypes.bool,
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='panel'>
          <div className='panel_content'>
            <LoginForm
              onRedirectPasswordReset={this.props.onRedirectPasswordReset}
              onSubmit={this.props.onSubmit}
              isLoading={this.props.inProgress}
            />
          { this.props.errors ? this.props.errors['email or password'][0] : '' }
          </div>
          <div className='sub_panel'>
            <Text size='regular'>New? <Link to='/register'>Create an account</Link>.</Text>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
