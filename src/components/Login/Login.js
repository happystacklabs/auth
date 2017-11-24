import React from 'react';
import './Login.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';


class Login extends React.Component {
  render() {
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
                />
              </div>
              <div className='input'>
                <TextInput
                  name='password'
                  label='Password'
                  type='password'
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

export default Login;
