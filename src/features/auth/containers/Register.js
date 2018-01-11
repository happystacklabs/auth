import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { register, registerPageUnloaded } from '../redux';
import '../styles/Register.css';


const mapStateToProps = state => ({ ...state.auth });


const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(register(username, email, password));
  },
  onUnload: () => {
    dispatch(registerPageUnloaded());
  },
});


const propTypes = {
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUnload: PropTypes.func,
};


const defaultProps = {
  onSubmit: undefined,
  inProgress: false,
  errors: undefined,
  onUnload: undefined,
};


export class Register extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div className="panel register_panel">
          <div className="panel_content">
            <RegisterForm
              onSubmit={this.props.onSubmit}
              isLoading={this.props.inProgress}
              errors={this.props.errors}
            />
          </div>
          <div className="sub_panel">
            <Text size="regular">Have an account? <Link to="/login">Sign In</Link>.</Text>
          </div>
        </div>
      </div>
    );
  }
}


Register.propTypes = propTypes;
Register.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Register);
