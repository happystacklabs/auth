import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import { NavLink, MemoryRouter } from 'react-router-dom';


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
});
