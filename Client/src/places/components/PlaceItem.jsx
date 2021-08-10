import React from 'react';

import {
  placeItem,
  placeItem__image,
  placeItem__info,
  placeItem__actions,
} from './PlaceItem.module.scss';

const PlaceItem = ({
  id,
  image,
  title,
  description,
  adress,
  creator,
  location,
}) => {
  return (
    <li className={placeItem}>
      <div className={placeItem__image}>
        <img src={image} alt={title} />
      </div>
      <div className={placeItem__info}>
        <h2>{title}</h2>
        <h3>{adress}</h3>
        <p>{description}</p>
      </div>
      <div className={placeItem__actions}>
        <button>View Place on map</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
};

export default PlaceItem;
