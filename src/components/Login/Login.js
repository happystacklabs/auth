import React from 'react';
import './Login.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  REDIRECT_PASSWORD_RESET,
} from '../../constants/actionTypes';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirectPasswordReset: () =>
    dispatch({ type: REDIRECT_PASSWORD_RESET })
});

export class Login extends React.Component {
  render() {
    const passwordAction = {
      title: 'Forgot Password?',
      onAction: (event) => {
        event.preventDefault();
        this.props.onRedirectPasswordReset();
      },
    };

    return (
      <div>
        <h1>Login</h1>
        <div className='panel'>
          <div className='panel_content'>
            <form className='form'>
              <div className='input'>
                <TextInput
                  name='email'
                  label='Email address'
                  type='email'
                  onChange={this.props.onChangeEmail}
                  value={this.props.email}
                />
              </div>
              <div className='input'>
                <TextInput
                  name='password'
                  label='Password'
                  type='password'
                  action={passwordAction}
                />
              </div>
              <Button size='large' color='purple' fullWidth>Sign In</Button>
            </form>
          </div>
          <div className='sub_panel'>
            <Text size='regular'>New? <Link to='/register'>Create an account</Link>.</Text>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
