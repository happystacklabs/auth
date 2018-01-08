import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '@happystack/kit';
import validator from 'validator';
import '../styles/Settings.css';


function validate(values) {
  const errors = { isValid: true };
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
  if (values.password.length < 5 && values.password.length > 0) {
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
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
};


const defaultProps = {
  onSubmit: undefined,
  isLoading: false,
  currentUser: null,
};


export class SettingsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        username: this.props.currentUser.username,
        email: this.props.currentUser.email,
      });
    }
  }

  onChangeInput = (event) => {
    this.setState({ [event.name]: event.value }, clearErrorField(this, event.name));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    if (isFormValid(this)) {
      this.props.onSubmit(this.state.username, this.state.email, this.state.password);
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
            error={this.state.errors.username}
          />
        </div>
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
            label="New Password"
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
          Update
        </Button>
      </form>
    );
  }
}


SettingsForm.propTypes = propTypes;
SettingsForm.defaultProps = defaultProps;


export default SettingsForm;
