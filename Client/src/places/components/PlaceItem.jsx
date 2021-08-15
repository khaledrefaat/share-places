import React, { useState } from 'react';

import CustomModal from '../../shared/componets/UiElements/CustomModal';

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
  coordinates,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal onClose={handleClose} open={open} header={adress}>
        <h3>The Map</h3>
      </CustomModal>
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
          <button className="btn btn-outline-success" onClick={handleOpen}>
            View on map
          </button>
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </li>
    </>
  );
};

export default PlaceItem;
