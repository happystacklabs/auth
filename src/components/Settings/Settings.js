import React from 'react';
import './Settings.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';


class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
          <div className='panel settings_panel'>
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
                <Button size='large' color='purple' fullWidth>Update</Button>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

export default Settings;
