import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '@happystack/kit';
import '../styles/PasswordReset.css';


function validate(values) {
  const errors = {};
  // Password validation
  if (!values.password) {
    errors.password = 'Please enter a password';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters';
  }
  // PasswordConfirmation validation
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  } else if (values.passwordConfirm.length < 5) {
    errors.passwordConfirm = 'Password must be at least 5 characters';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password confirmation is different from password';
  }
  return errors;
}


function clearErrorField(_this, name) {
  const errors = { ..._this.state.errors };
  delete errors[name];
  _this.setState({ errors });
}


const propTypes = {
  token: PropTypes.string,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};


const defaultProps = {
  token: undefined,
  onSubmit: undefined,
  isLoading: false,
};


export class PasswordResetForm extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirm: '',
      errors: {},
    };
  }

  onChangeInput = (event) => {
    this.setState({ [event.name]: event.value }, clearErrorField(this, event.name));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const errors = validate(this.state);
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.props.onSubmit(this.state.password, this.state.passwordConfirm, this.props.token);
    } else {
      this.setState({ ...this.state, errors });
    }
  };

  render() {
    const tokenError = this.props.token ? '' : 'Token is missing';

    return (
      <form className="form" onSubmit={this.onSubmitForm}>
        <span>{tokenError}</span>
        <div className="form__input">
          <TextInput
            name="password"
            label="Password"
            type="password"
            onChange={this.onChangeInput}
            value={this.state.password}
            error={this.state.errors.password}
            helpText="Use at least five characters."
          />
        </div>
        <div className="form__input">
          <TextInput
            name="passwordConfirm"
            label="Password Confirmation"
            type="password"
            onChange={this.onChangeInput}
            value={this.state.passwordConfirm}
            error={this.state.errors.passwordConfirm}
          />
        </div>
        <Button
          className="form__button"
          size="large"
          color="main"
          fullWidth
          loading={this.props.isLoading}
        >
          Reset Password
        </Button>
      </form>
    );
  }
}


PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;


export default PasswordResetForm;
