import React from 'react';
import { TextInput, Button, Text } from '@happystack/kit';
import validator from 'validator';
import '../styles/Login.css';



export class LoginForm extends React.Component {

  render() {
    const passwordAction = {
      title: 'Forgot Password?',
      onAction: (event) => {
        event.preventDefault();
      },
    };

    return (
      <form className='form' onSubmit={this.onSubmitForm}>
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
            action={passwordAction}
          />
        </div>
        <Button
          size='large'
          color='purple'
          fullWidth
        >Sign In</Button>
      </form>
    );
  }
}

export default LoginForm;
