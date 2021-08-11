import React, { useState, useEffect } from 'react';

import { header, fixed } from './MainHeader.module.scss';

const MainHeader = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      window.addEventListener('scroll', () => {
        const offset = window.scrollY;
        if (offset > 75) setScrolled(true);
        else setScrolled(false);
      });
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [scrolled]);

  return (
    <header className={`${header} ${scrolled ? fixed : ''}`}>{children}</header>
  );
};

export default MainHeader;
