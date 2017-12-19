import React from 'react';
import {Text} from '@happystack/kit';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm';
import PropTypes from 'prop-types';
import {
  passwordResetRedirect,
  login,
} from '../redux';
import '../styles/Login.css';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirectPasswordReset: () => {
    dispatch(passwordResetRedirect());
  },
  onSubmit: (email, password) => {
    dispatch(login(email, password));
  }
});

const propTypes = {
  onRedirectPasswordReset: PropTypes.func,
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
};

export function Login(props) {
  return (
    <div>
      <h1>Login</h1>
      <div className="panel">
        <div className="panel_content">
          <LoginForm
            onRedirectPasswordReset={props.onRedirectPasswordReset}
            onSubmit={props.onSubmit}
            isLoading={props.inProgress}
          />
        </div>
        <div className="sub_panel">
          <Text size="regular">New? <Link to="/register">Create an account</Link>.</Text>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
