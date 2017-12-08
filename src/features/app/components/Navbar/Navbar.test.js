import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { Avatar } from '@happystack/kit';


describe('Navbar', () => {
  it('render a sign in navlink', () => {
    const navbar = mount(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    );
    expect(navbar.containsMatchingElement(<NavLink to='/login'>Sign In</NavLink>)).toBe(true);
  });

  it('render a sign up navlink', () => {
    const navbar = mount(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    );
    expect(navbar.containsMatchingElement(<NavLink to='/register'>Sign Up</NavLink>)).toBe(true);
  });

  it('hide the signup and sign in button if logged in', () => {
    const currentUser = { username: 'foo' };
    const navbar = mount(
      <MemoryRouter>
        <Navbar currentUser={currentUser}/>
      </MemoryRouter>
    );
    expect(navbar.containsMatchingElement(<NavLink to='/register'>Sign Up</NavLink>)).toBe(false);
    expect(navbar.containsMatchingElement(<NavLink to='/login'>Sign In</NavLink>)).toBe(false);
  });

  it('show the loading state when passed to props', () => {
    const navbar = mount(
      <MemoryRouter>
        <Navbar loading/>
      </MemoryRouter>
    );
    expect(navbar.containsMatchingElement(<NavLink to='/register'>Sign Up</NavLink>)).toBe(false);
    expect(navbar.containsMatchingElement(<NavLink to='/login'>Sign In</NavLink>)).toBe(false);
  });

  it('show the avatar if loggued in', () => {
    const currentUser = { username: 'foo' };
    const navbar = mount(
      <MemoryRouter>
        <Navbar currentUser={currentUser}/>
      </MemoryRouter>
    );
    expect(navbar.find('.kit-Avatar__placeholder').first().text()).toBe('FO');
  });

  it('show the settings and logout menu if loggued in', () => {
    const currentUser = { username: 'foo' };
    const navbar = mount(
      <MemoryRouter>
        <Navbar currentUser={currentUser}/>
      </MemoryRouter>
    );
    // expect(navbar.containsMatchingElement(<NavLink to='/logout'>Log Out</NavLink>)).toBe(true);
    expect(navbar.containsMatchingElement(<NavLink to='/settings'>Settings</NavLink>)).toBe(true);
  });
});
