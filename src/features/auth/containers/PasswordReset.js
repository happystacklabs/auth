import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Text } from '@happystack/kit';
import PasswordResetForm from '../components/PasswordResetForm';
import { passwordReset, passwordResetPageUnloaded } from '../redux';


const mapStateToProps = state => ({ ...state.auth });


const mapDispatchToProps = dispatch => ({
  onSubmit: (password, passwordConfirm, token) => {
    dispatch(passwordReset(password, passwordConfirm, token));
  },
  onUnload: () => {
    dispatch(passwordResetPageUnloaded());
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inProgress: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
  passwordReset: PropTypes.bool,
};


const defaultProps = {
  onSubmit: undefined,
  match: undefined,
  inProgress: false,
  errors: undefined,
  onUnload: undefined,
  passwordReset: undefined,
};


export class PasswordReset extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (this.props.passwordReset) {
      return (<Redirect to="/login" />);
    }
    return (
      <div>
        <h1>Reset Password</h1>
        <div className="panel password-reset">
          <div className="panel__content">
            <Text color="negative">{(((this.props.errors) || {}).token || {}).msg}</Text>
            <PasswordResetForm
              onSubmit={this.props.onSubmit}
              isLoading={this.props.inProgress}
              token={this.props.match.params.token}
            />
          </div>
        </div>
      </div>
    );
  }
}


PasswordReset.propTypes = propTypes;
PasswordReset.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
