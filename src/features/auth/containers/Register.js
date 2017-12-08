import React from 'react';
import '../styles/Register.css';
import { TextInput, Button, Text } from '@happystack/kit';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../redux';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    dispatch(register(username, email, password));
  }
});

export class Register extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    inProgress: PropTypes.bool,
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
          <div className='panel register_panel'>
            <div className='panel_content'>
              <RegisterForm
                onSubmit={this.props.onSubmit}
                isLoading={this.props.inProgress}
              />
            </div>
            <div className='sub_panel'>
              <Text size='regular'>Have an account? <Link to='/login'>Sign In</Link>.</Text>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
