import React from 'react';
import '../styles/PasswordReset.css';
import { TextInput, Button, Text } from '@happystack/kit';


export function PasswordReset(props) {
  return (
    <div>
      <h1>Password Reset</h1>
        <div className="panel passwordReset_panel">
          <div className="panel_content">
            <Text element="p" size="small">Enter your email address and we will send you a link to reset your password.</Text>
            <form className="form">
              <div className="input">
                <TextInput
                  name="email"
                  label="Email address"
                  type="email"
                />
              </div>
              <Button size="large" color="purple" fullWidth>Send Reset Link</Button>
            </form>
            <span className="cancel">
              <Button plain fullWidth onClick={props.history.goBack}>Cancel</Button>
            </span>
          </div>
        </div>
    </div>
  );
}

export default PasswordReset;
