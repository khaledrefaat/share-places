import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import { list, logout } from './NavLinks.module.scss';

const NavLinks = ({ onNavItemClick }) => {
  const navActiveStyle = {
    color: '#999',
  };

  const auth = useContext(AuthContext);

  return (
    <ul className={list}>
      <li onClick={onNavItemClick}>
        <NavLink activeStyle={navActiveStyle} to="/" exact>
          all users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li onClick={onNavItemClick}>
          <NavLink activeStyle={navActiveStyle} to="/u1/places">
            my places
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={onNavItemClick}>
          <NavLink activeStyle={navActiveStyle} to="/places/new">
            add place
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className={logout} onClick={auth.logout}>
          Logout
        </li>
      )}
      {!auth.isLoggedIn && (
        <li onClick={onNavItemClick}>
          <NavLink activeStyle={navActiveStyle} to="/auth">
            authenticate
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
