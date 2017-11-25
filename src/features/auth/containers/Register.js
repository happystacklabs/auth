import React from 'react';
import '../styles/Register.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';


export class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
          <div className='panel register_panel'>
            <div className='panel_content'>
              <form className='form'>
                <div className='input'>
                  <TextInput
                    name='username'
                    label='Username'
                    type='text'
                  />
                </div>
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
                    helpText='Use at least one lowercase letter, one numeral, and minimum seven characters.'
                  />
                </div>
                <Button size='large' color='purple' fullWidth>Sign Up</Button>
                <span className='terms'>
                  <Text size='extraSmall'>
                    By signing up, you agree to our <a href='#' target='blank'>Terms</a> & <a href='#' target='blank'>Privacy Policy</a>.
                  </Text>
                </span>
              </form>
            </div>
            <div className='sub_panel'>
              <Text size='regular'>Have an account? <Link to='/login'>Sign In</Link>.</Text>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;
