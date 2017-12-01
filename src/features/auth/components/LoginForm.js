import React from 'react';
import { TextInput, Button, Text } from '@happystack/kit';
import validator from 'validator';
import '../styles/Login.css';
import PropTypes from 'prop-types';


const validate = (values) => {
  const errors = {isValid: true};
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


export class LoginForm extends React.Component {
  static propTypes = {
    onRedirectPasswordReset: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  isFormValid = () => {
    const errors = validate(this.state);
    this.setState({ errors });
    return errors.isValid;
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
    }
  };

  render() {
    const passwordAction = {
      title: 'Forgot Password?',
      onAction: (event) => {
        event.preventDefault();
        this.props.onRedirectPasswordReset();
      },
    };

    return (
      <form className='form' onSubmit={this.onSubmitForm}>
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
            action={passwordAction}
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
        >Sign In</Button>
      </form>
    );
  }
}

export default LoginForm;
