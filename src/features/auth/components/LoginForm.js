import React from 'react';
import { TextInput, Button } from '@happystack/kit';
import validator from 'validator';
import PropTypes from 'prop-types';
import '../styles/Login.css';


function validate(values) {
  const errors = { isValid: true };
  // Email validation
  if (!values.email) {
    errors.email = 'Please enter an email address';
    errors.isValid = false;
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
    errors.isValid = false;
  }
  // Password validation
  if (!values.password) {
    errors.password = 'Please enter a password';
    errors.isValid = false;
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters';
    errors.isValid = false;
  }
  return errors;
}


function clearErrorField(_this, name) {
  const errors = { ..._this.state.errors, [name]: '' };
  _this.setState({ errors });
}


function isFormValid(_this) {
  const errors = validate(_this.state);
  _this.setState({ errors });
  return errors.isValid;
}


const propTypes = {
  onRedirectPasswordReset: PropTypes.func,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  onRedirectPasswordReset: undefined,
  onSubmit: undefined,
  isLoading: false,
};

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  onChangeInput = (event) => {
    this.setState({ [event.name]: event.value }, clearErrorField(this, event.name));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    if (isFormValid(this)) {
      this.props.onSubmit(this.state.email, this.state.password);
    }
  };

  onKeyPress = (event) => {
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  render() {
    const passwordAction = {
      title: 'Forgot Password?',
      onAction: () => {
        this.props.onRedirectPasswordReset();
      },
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="form" onSubmit={this.onSubmitForm} onKeyPress={this.onKeyPress}>
        <div className="input">
          <TextInput
            name="email"
            label="Email address"
            type="email"
            onChange={this.onChangeInput}
            value={this.state.email}
            error={this.state.errors.email}
          />
        </div>
        <div className="input">
          <TextInput
            name="password"
            label="Password"
            type="password"
            action={passwordAction}
            onChange={this.onChangeInput}
            value={this.state.password}
            error={this.state.errors.password}
          />
        </div>
        <Button
          size="large"
          color="purple"
          fullWidth
          loading={this.props.isLoading}
        >
          Sign In
        </Button>
      </form>
    );
  }
}


LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
