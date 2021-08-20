import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import MenuIcon from '@material-ui/icons/Menu';
import { menuBtn, brand, nav, visible } from './MainNavigation.module.scss';

const MainNavigation = () => {
  const [isNavHidden, setIsNavHidden] = useState(true);

  return (
    <MainHeader>
      <h1 className={brand}>
        <Link to="/">your places</Link>
      </h1>
      <button
        className={`${menuBtn}`}
        onClick={() => setIsNavHidden(isNavHidden => !isNavHidden)}
      >
        <MenuIcon />
      </button>
      <nav className={`${nav} ${isNavHidden ? '' : visible}`}>
        <NavLinks onNavItemClick={() => setIsNavHidden(true)} />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
