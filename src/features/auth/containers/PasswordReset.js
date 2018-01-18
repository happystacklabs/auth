import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button, Text } from '@happystack/kit';
import '../styles/PasswordReset.css';
import '../styles/Panel.css';


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
      <div className="panel password-reset">
        <div className="panel__content">
          <Text element="p" size="caption">Enter your email address and we will send you a link to reset your password.</Text>
          <form className="form">
            <div className="form__input">
              <TextInput
                name="email"
                label="Email address"
                type="email"
              />
            </div>
            <Button className="form__button" size="large" color="main" fullWidth>Send Reset Link</Button>
          </form>
          <span className="password-reset__cancel">
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
