import React from 'react';

import PlaceItem from './PlaceItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { placeList, box, link } from './PlaceList.module.scss';

const PlaceList = props => {
  if (props.items && props.items.length > 0) {
    return (
      <ul className={`${placeList} d-flex justify-content-around`}>
        {props.items.map(
          ({ id, imageUrl, title, description, adress, creator, location }) => (
            <PlaceItem
              key={id}
              id={id}
              image={imageUrl}
              title={title}
              description={description}
              adress={adress}
              creatorId={creator}
              coordinates={location}
            />
          )
        )}
      </ul>
    );
  }
  return (
    <div className={box}>
      <h2>no places were found. maybe create one?</h2>
      <Link className={link} to="/places/new">
        <Button variant="contained" color="primary">
          Share Place
        </Button>
      </Link>
    </div>
  );
};

export default PlaceList;
