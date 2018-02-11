import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '@happystack/kit';
import validator from 'validator';
import '../styles/PasswordReset.css';


function validate(values) {
  const errors = {};
  // Email validation
  if (!values.email) {
    errors.email = 'Please enter an email address';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
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


export class PasswordForgotForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
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
      this.props.onSubmit(this.state.email);
    } else {
      this.setState({ ...this.state, errors });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmitForm}>
        <div className="form__input">
          <TextInput
            name="email"
            label="Email address"
            type="email"
            onChange={this.onChangeInput}
            value={this.state.email}
            error={this.state.errors.email || (((this.props.errors || {}).email || {}).msg || '')}
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


PasswordForgotForm.propTypes = propTypes;
PasswordForgotForm.defaultProps = defaultProps;


export default PasswordForgotForm;
