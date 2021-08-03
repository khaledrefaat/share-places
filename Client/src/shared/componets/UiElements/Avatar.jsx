import React from 'react';

import { avatar } from './Avatar.module.scss';

const Avatar = ({ src, alt }) => {
  return <img className={avatar} src={src} alt={alt} />;
};

export default Avatar;
