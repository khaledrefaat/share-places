import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CustomModal from '../../shared/componets/UiElements/CustomModal';
import { green } from '@material-ui/core/colors';

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

  const ColorButton = withStyles(theme => ({
    root: {
      color: green[700],
      backgroundColor: 'transparent',
      borderColor: green[700],
      '&:hover': {
        backgroundColor: green[700],
        color: '#ffffff',
      },
    },
  }))(Button);

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
          <ColorButton onClick={handleOpen} variant="outlined" color="primary">
            View On map
          </ColorButton>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </div>
      </li>
    </>
  );
};

export default PlaceItem;
