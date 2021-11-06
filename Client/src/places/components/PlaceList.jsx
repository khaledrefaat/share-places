import React, { useContext } from 'react';

import PlaceItem from './PlaceItem';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import { placeList, box, link } from './PlaceList.module.scss';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceList = props => {
  const auth = useContext(AuthContext);
  const { userId } = useParams();

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

  return auth.isLoggedIn && auth.userId === userId ? (
    <div className={box}>
      <h2>no places were found. maybe create one?</h2>
      <Link className={link} to="/places/new">
        <Button variant="contained" color="primary">
          Share Place
        </Button>
      </Link>
    </div>
  ) : (
    <div className={box}>
      <h2>This User has no places to share</h2>
    </div>
  );
};

export default PlaceList;
