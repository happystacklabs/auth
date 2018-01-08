import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Text, Avatar, Button } from '@happystack/kit';
import './Navbar.css';


function Branding() {
  return (
    <div className="branding">
      <a href="http://happystack.io" target="blank" className="logo"><img src="./images/logo@2x.png" alt="Happystack" /></a>
      <Link to="/"><Text element="h1" weight="bold" size="regular">Auth</Text></Link>
      <Text color="purple">|
        <a href="https://github.com/happystacklabs/auth" target="blank">
          <Text color="purple">Repo</Text>
        </a>
      </Text>
    </div>
  );
}


function Navigation(props) {
  if (props.currentUser) {
    return (
      <div className="navbar-right">
        <ul>
          <li><Text><NavLink to="/dashboard">Dashboard</NavLink></Text></li>
          <li><Text><NavLink to="/settings">Settings</NavLink></Text></li>
          <li><Button plain size="large" onClick={props.logout} className="logout">Sign Out</Button></li>
          <li><Avatar size="small" initial={props.currentUser.username} /></li>
        </ul>
      </div>
    );
  }
  return (
    <div className="navbar-right">
      <ul>
        <li><Text><NavLink to="/login">Sign In</NavLink></Text></li>
        <li><Text><NavLink to="/register">Sign Up</NavLink></Text></li>
      </ul>
    </div>
  );
}

Navigation.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  logout: PropTypes.func,
};


Navigation.defaultProps = {
  currentUser: undefined,
  logout: undefined,
};


function Navbar(props) {
  if (props.loading) {
    return (
      <nav className="navbar">
        <div className="container">
          <Branding />
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <div className="container">
        <Branding />
        <Navigation currentUser={props.currentUser} logout={props.logout} />
      </div>
    </nav>
  );
}


Navbar.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  logout: PropTypes.func,
  loading: PropTypes.bool,
};


Navbar.defaultProps = {
  currentUser: undefined,
  logout: undefined,
  loading: false,
};


export default Navbar;
