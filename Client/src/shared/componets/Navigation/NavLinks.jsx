import React from 'react';
import { NavLink } from 'react-router-dom';

import { list } from './NavLinks.module.scss';

const NavLinks = () => {
  return (
    <ul className={list}>
      <li>
        <NavLink to="/" exact>
          all users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">my places</NavLink>
      </li>
      <li>
        <NavLink to="/new/places">add place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
