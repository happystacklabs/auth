import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text } from '@happystack/kit';
import PasswordForgotForm from '../components/PasswordForgotForm';
import { passwordForgot, passwordForgotPageUnloaded } from '../redux';


const mapStateToProps = state => ({ ...state.auth });


const mapDispatchToProps = dispatch => ({
  onSubmit: (email) => {
    dispatch(passwordForgot(email));
  },
  onUnload: () => {
    dispatch(passwordForgotPageUnloaded());
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  inProgress: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
  emailSent: PropTypes.bool,
};


const defaultProps = {
  onSubmit: undefined,
  history: undefined,
  inProgress: false,
  errors: undefined,
  onUnload: undefined,
  emailSent: undefined,
};


export class PasswordForgot extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <div className="panel password-reset">
          <div className="panel__content">
            {this.props.emailSent ? (
              <Text element="p" size="body">Please check your email to reset your password.</Text>
            ) : (
              <div>
                <Text element="p" size="caption">Enter your email address and we will send you a link to reset your password.</Text>
                <PasswordForgotForm
                  onSubmit={this.props.onSubmit}
                  isLoading={this.props.inProgress}
                  errors={this.props.errors}
                />
                <span className="password-reset__cancel">
                  <Button plain fullWidth onClick={this.props.history.goBack}>Cancel</Button>
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}


PasswordForgot.propTypes = propTypes;
PasswordForgot.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(PasswordForgot);
