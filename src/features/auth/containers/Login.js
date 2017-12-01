import React from 'react';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import {
  passwordResetRedirect,
  authFieldUpdate
} from '../redux';
import '../styles/Login.css';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirectPasswordReset: () => {
    dispatch(passwordResetRedirect())
  }
});

export class Login extends React.Component {

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='panel'>
          <div className='panel_content'>
            <LoginForm/>
            />
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
