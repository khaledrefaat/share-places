import React from 'react';
import { NavLink } from 'react-router-dom';

import { list } from './NavLinks.module.scss';

const NavLinks = () => {
  const navActiveStyle = {
    color: '#999',
  };

  return (
    <ul className={list}>
      <li>
        <NavLink activeStyle={navActiveStyle} to="/" exact>
          all users
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={navActiveStyle} to="/u1/places">
          my places
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={navActiveStyle} to="/places/new">
          add place
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={navActiveStyle} to="/auth">
          authenticate
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
