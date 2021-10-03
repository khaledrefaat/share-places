import React, { useState, useContext } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

import CustomModal from '../../shared/components/UiElements/CustomModal';
import Map from '../../shared/components/UiElements/Map';

import {
  placeItem,
  placeItem__image,
  placeItem__buttons,
  placeItem__link,
  deleteModalButtons,
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
  const [openMap, setOpenMap] = useState(false);
  const [sohwConfirmButton, setShowConfirmButton] = useState(false);

  const openMapHandler = () => setOpenMap(true);
  const closeMapHandler = () => setOpenMap(false);

  const sohwDeleteWarningHandler = () => setShowConfirmButton(true);

  const cancelDeleteHandler = () => setShowConfirmButton(false);

  const confirmDeletHandler = () => console.log('deleting...');

  const auth = useContext(AuthContext);

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

  const mapButton = (
    <Button variant="contained" color="primary" onClick={closeMapHandler}>
      Close
    </Button>
  );

  const deleteButtons = (
    <div className={deleteModalButtons}>
      <Button variant="contained" color="primary" onClick={cancelDeleteHandler}>
        Close
      </Button>
      <Button
        onClick={confirmDeletHandler}
        variant="contained"
        color="secondary"
      >
        Delete
      </Button>
    </div>
  );

  return (
    <>
      <CustomModal
        onClose={closeMapHandler}
        open={openMap}
        header={adress}
        footer={mapButton}
        map
      >
        <Map center={coordinates} zoom={16} />
      </CustomModal>
      <CustomModal
        onClose={cancelDeleteHandler}
        open={sohwConfirmButton}
        header={'Are You Sure?'}
        footer={deleteButtons}
      >
        <Typography variant="subtitle1" gutterBottom component="div">
          do you want to proceed and delete tihs place? Please note that it
          can't be undone thereafter.
        </Typography>
      </CustomModal>

      <Card className={placeItem}>
        <CardActionArea>
          <CardMedia className={placeItem__image} image={image} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h3">
              {adress}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={placeItem__buttons}>
          <ColorButton
            onClick={openMapHandler}
            variant="outlined"
            color="primary"
          >
            View On map
          </ColorButton>
          {auth.isLoggedIn && (
            <>
              <Button variant="contained" color="primary">
                <Link className={placeItem__link} to={`/places/${id}`}>
                  Edit
                </Link>
              </Button>
              <Button
                onClick={sohwDeleteWarningHandler}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default PlaceItem;
