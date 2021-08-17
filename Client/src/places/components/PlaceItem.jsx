import React, { useState } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import CustomModal from '../../shared/componets/UiElements/CustomModal';
import Map from '../../shared/componets/UiElements/Map';

import { placeItem, placeItem__image } from './PlaceItem.module.scss';

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
        <Map center={coordinates} zoom={16} />
      </CustomModal>

      <Card onClick={handleOpen} className={placeItem}>
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
        <CardActions>
          <ColorButton onClick={handleOpen} variant="outlined" color="primary">
            View On map
          </ColorButton>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PlaceItem;
