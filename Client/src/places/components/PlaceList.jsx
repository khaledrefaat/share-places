import React from 'react';

import PlaceItem from './PlaceItem';

import { placeList } from './PlaceList.module.scss';

const PlaceList = props => {
  if (props.items && props.items.length > 0) {
    return (
      <ul className="placeList">
        {props.items.map(
          ({
            id,
            imageUrl,
            title,
            description,
            address,
            creator,
            location,
          }) => (
            <PlaceItem
              key={id}
              id={id}
              image={imageUrl}
              title={title}
              description={description}
              adress={address}
              creatorId={creator}
              coordinates={location}
            />
          )
        )}
      </ul>
    );
  }
  return (
    <div>
      <h2>no places found!!</h2>
      <button>Share Place</button>
    </div>
  );
};

export default PlaceList;
