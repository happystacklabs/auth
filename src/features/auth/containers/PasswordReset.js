import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button, Text } from '@happystack/kit';
import '../styles/PasswordReset.css';


const propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};


const defaultProps = {
  history: undefined,
};


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


PasswordReset.propTypes = propTypes;
PasswordReset.defaultProps = defaultProps;


export default PasswordReset;
