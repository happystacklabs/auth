import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { Text } from '@happystack/kit';


const Branding = props => {
  return (
    <div className='branding'>
      <a href='http://happystack.io' target='blank' className='logo'><img src='./images/logo@2x.png'/></a>
      <Link to='/'><Text element='h1' weight='bold' size='regular'>Auth</Text></Link>
      <Text color='purple'>| <a href='https://github.com/happystacklabs/auth' target='blank'>
        <Text color='purple'>Repo</Text>
      </a></Text>
    </div>
  );
}

const Navigation = props => {
  return (
    <div className='navbar-right'>
      <ul>
        <li><Text color='inkLight'><NavLink to='/login'>Sign In</NavLink></Text></li>
        <li><Text color='inkLight'><NavLink to='/register'>Sign Up</NavLink></Text></li>
      </ul>
    </div>
  );
}

class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <Branding/>
          <Navigation/>
        </div>
      </nav>
    );
  }
}

export default Navbar;
