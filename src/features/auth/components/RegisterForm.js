import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button, Text } from '@happystack/kit';
import validator from 'validator';
import '../styles/Register.css';


function validate(values) {
  const errors = {};
  // username validation
  if (!values.username) {
    errors.username = 'Please enter a username';
  } else if (values.username.length < 5) {
    errors.username = 'Username must be at least 5 characters';
  }
  // Email validation
  if (!values.email) {
    errors.email = 'Please enter an email address';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  // Password validation
  if (!values.password) {
    errors.password = 'Please enter a password';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters';
  }
  return errors;
}


function clearErrorField(_this, name) {
  const errors = { ..._this.state.errors };
  delete errors[name];
  _this.setState({ errors });
}


const propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};


const defaultProps = {
  onSubmit: undefined,
  isLoading: false,
  errors: undefined,
};


export class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
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
    const errors = validate(this.state);
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.props.onSubmit(this.state.username, this.state.email, this.state.password);
    } else {
      this.setState({ ...this.state, errors });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmitForm}>
        <div className="input">
          <TextInput
            name="username"
            label="Username"
            type="text"
            onChange={this.onChangeInput}
            value={this.state.username}
            error={this.state.errors.username || ((this.props.errors || {}).username || '')}
          />
        </div>
        <div className="input">
          <TextInput
            name="email"
            label="Email address"
            type="email"
            onChange={this.onChangeInput}
            value={this.state.email}
            error={this.state.errors.email || ((this.props.errors || {}).email || '')}
          />
        </div>
        <div className="input">
          <TextInput
            name="password"
            label="Password"
            type="password"
            helpText="Use at least one lowercase letter, one numeral, and minimum seven characters."
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
          Sign Up
        </Button>
        <span className="terms">
          <Text size="extraSmall">
            By signing up, you agree to our <a href="/" target="blank">Terms</a> & <a href="/" target="blank">Privacy Policy</a>.
          </Text>
        </span>
      </form>
    );
  }
}


RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;


export default RegisterForm;
