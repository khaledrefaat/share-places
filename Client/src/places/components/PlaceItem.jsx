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
    <li className={`${placeItem} card`}>
      <img
        src={image}
        alt={title}
        className={`${placeItem__image} card-img-top`}
      />
      <div className={`${placeItem__info} card-body`}>
        <h2 className="card-title">{title}</h2>
        <h3>{adress}</h3>
        <p>{description}</p>
        <hr />
      </div>
      <div
        className={`${placeItem__actions} card-body d-flex justify-content-evenly`}
      >
        <button className="btn btn-outline-success">View on map</button>
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </li>
  );
};

export default PlaceItem;
