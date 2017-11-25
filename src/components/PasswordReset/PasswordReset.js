import React from 'react';
import './PasswordReset.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';


class PasswordReset extends React.Component {
  render() {
    return (
      <div>
        <h1>Password Reset</h1>
          <div className='panel passwordReset_panel'>
            <div className='panel_content'>
              <Text element='p' size='small'>Enter your email address and we will send you a link to reset your password.</Text>
              <form className='form'>
                <div className='input'>
                  <TextInput
                    name='email'
                    label='Email address'
                    type='email'
                  />
                </div>
                <Button size='large' color='purple' fullWidth>Send Reset Link</Button>
                <Button plain fullWidth>Cancel</Button>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

export default PasswordReset;
