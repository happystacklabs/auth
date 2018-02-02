import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Text, Avatar, Button } from '@happystack/kit';
import './Navbar.css';


function Branding() {
  return (
    <div className="navbar__branding">
      <a href="http://happystack.io" target="blank" className="navbar__branding-logo">
        <img className="navbar__branding-image" src="./images/logo@2x.png" alt="Happystack" />
      </a>
      <Link to="/"><Text className="navbar__branding-title" element="h1" size="display-small">Boilerplate</Text></Link>
    </div>
  );
}


function Navigation(props) {
  if (props.currentUser) {
    return (
      <div className="navbar__settings">
        <ul className="navbar__settings-list">
          <li className="navbar__settings-item">
            <Text bold><NavLink to="/dashboard">Dashboard</NavLink></Text>
          </li>
          <li className="navbar__settings-item">
            <Text bold><NavLink to="/settings">Settings</NavLink></Text>
          </li>
          <li className="navbar__settings-item">
            <Button plain size="medium" onClick={props.logout} className="navbar__logout">Sign Out</Button>
          </li>
          <li className="navbar__settings-item">
            <Avatar size="small" initial={props.currentUser.username} />
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="navbar__settings">
      <ul className="navbar__settings-list">
        <li className="navbar__settings-item"><Text bold color="ink-light"><NavLink to="/login">Sign In</NavLink></Text></li>
        <li className="navbar__settings-item"><Text bold><NavLink to="/register">Sign Up</NavLink></Text></li>
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
        <div className="navbar__container">
          <Branding />
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <div className="navbar__container">
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
