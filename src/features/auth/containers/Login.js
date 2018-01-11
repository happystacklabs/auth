import React from 'react';
import { Text } from '@happystack/kit';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import {
  passwordResetRedirect,
  login,
  loginPageUnloaded,
} from '../redux';
import '../styles/Login.css';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirectPasswordReset: () => {
    dispatch(passwordResetRedirect());
  },
  onSubmit: (email, password) => {
    dispatch(login(email, password));
  },
  onUnload: () => {
    dispatch(loginPageUnloaded());
  },
});


const propTypes = {
  onRedirectPasswordReset: PropTypes.func,
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
};


const defaultProps = {
  onRedirectPasswordReset: undefined,
  onSubmit: undefined,
  inProgress: false,
  errors: undefined,
  onUnload: undefined,
};


export class Login extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="panel">
          <div className="panel_content">
            <LoginForm
              onRedirectPasswordReset={this.props.onRedirectPasswordReset}
              onSubmit={this.props.onSubmit}
              isLoading={this.props.inProgress}
              errors={this.props.errors}
            />
          </div>
          <div className="sub_panel">
            <Text size="regular">New? <Link to="/register">Create an account</Link>.</Text>
          </div>
        </div>
      </div>
    );
  }
}


Login.propTypes = propTypes;
Login.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Login);
