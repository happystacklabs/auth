import React from 'react';
import { TextInput, Button, Text } from '@happystack/kit';
import validator from 'validator';
import '../styles/Register.css';
import PropTypes from 'prop-types';


const validate = (values) => {
  const errors = {isValid: true};
  // username validation
  if (!values.username) {
    errors.username = 'Please enter a username';
    errors.isValid = false;
  } else if (values.username.length < 5) {
    errors.username = 'Username must be at least 5 characters';
    errors.isValid = false;
  }
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
};


export class RegisterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    };
  }

  static defaultProps = {
    isLoading: false,
  };

  clearErrorField = (name) => {
    const errors = {...this.state.errors, [name]: ''};
    this.setState({errors});
  };

  onChangeInput = (event) => {
    this.setState({ [event.name]: event.value }, this.clearErrorField(event.name));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.props.onSubmit(this.state.username, this.state.email, this.state.password);
    }
  };

  isFormValid = () => {
    const errors = validate(this.state);
    this.setState({ errors });
    return errors.isValid;
  };

  render() {
    return (
      <form className='form' onSubmit={this.onSubmitForm}>
        <div className='input'>
          <TextInput
            name='username'
            label='Username'
            type='text'
            onChange={this.onChangeInput}
            value={this.state.username}
            error={this.state.errors.username}
          />
        </div>
        <div className='input'>
          <TextInput
            name='email'
            label='Email address'
            type='email'
            onChange={this.onChangeInput}
            value={this.state.email}
            error={this.state.errors.email}
          />
        </div>
        <div className='input'>
          <TextInput
            name='password'
            label='Password'
            type='password'
            helpText='Use at least one lowercase letter, one numeral, and minimum seven characters.'
            onChange={this.onChangeInput}
            value={this.state.password}
            error={this.state.errors.password}
          />
        </div>
        <Button
          size='large'
          color='purple'
          fullWidth
          loading={this.props.isLoading}
        >
          Sign Up
        </Button>
        <span className='terms'>
          <Text size='extraSmall'>
            By signing up, you agree to our <a href='#' target='blank'>Terms</a> & <a href='#' target='blank'>Privacy Policy</a>.
          </Text>
        </span>
      </form>
    );
  }
};

export default RegisterForm;
