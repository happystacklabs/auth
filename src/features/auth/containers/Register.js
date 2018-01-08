import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { register } from '../redux';
import '../styles/Register.css';


const mapStateToProps = state => ({ ...state.auth });


const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(register(username, email, password));
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
};


const defaultProps = {
  onSubmit: undefined,
  inProgress: false,
};


export function Register(props) {
  return (
    <div>
      <h1>Register</h1>
      <div className="panel register_panel">
        <div className="panel_content">
          <RegisterForm
            onSubmit={props.onSubmit}
            isLoading={props.inProgress}
          />
        </div>
        <div className="sub_panel">
          <Text size="regular">Have an account? <Link to="/login">Sign In</Link>.</Text>
        </div>
      </div>
    </div>
  );
}


Register.propTypes = propTypes;
Register.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Register);
