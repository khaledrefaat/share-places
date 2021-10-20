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
          (
            { _id, image, title, description, adress, creator, location },
            index
          ) => (
            <PlaceItem
              key={index}
              id={_id}
              image={image}
              title={title}
              description={description}
              adress={adress}
              creatorId={creator}
              coordinates={location}
              onDelete={props.onPlaceDelete}
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
