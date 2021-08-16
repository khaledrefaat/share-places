import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/componets/UiElements/Avatar';

import {
  userItem,
  userItem__content,
  userItem__img,
  userItem__info,
} from './UserItem.module.scss';

export class UserItem extends Component {
  render() {
    const { name, img, placeCount, id } = this.props;
    return (
      <li className={userItem}>
        <Link to={`/${id}/places`}>
          <div className={`${userItem__content}`}>
            <div className={`${userItem__img} center`}>
              <Avatar src={img} alt={name} />
            </div>
            <div className={`${userItem__info}`}>
              <h2>{name}</h2>
              <h3>
                {placeCount} {placeCount === 1 ? 'place' : 'places'}
              </h3>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default UserItem;
