import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import { menuBtn, brand, nav, visible } from './MainNavigation.module.scss';

const MainNavigation = () => {
  const [isNavHidden, setIsNavHidden] = useState(true);

  return (
    <MainHeader>
      <h1 className={brand}>
        <Link to="/">your places</Link>
      </h1>
      <button
        className={`${menuBtn} d-flex align-items-center justify-content-center flex-column`}
        onClick={() => setIsNavHidden(isNavHidden => !isNavHidden)}
      >
        <span className="mb-1" />
        <span className="mb-1" />
        <span />
      </button>
      <nav className={`${nav} ${isNavHidden ? '' : visible}`}>
        <NavLinks onNavItemClick={() => setIsNavHidden(true)} />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
