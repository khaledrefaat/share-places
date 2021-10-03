import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import PlaceList from '../components/PlaceList';

import DUMMY_PLACES from '../../shared/DummyPlaces';

const UserPlaces = () => {
  const { userId } = useParams();

  const loadedPlace = DUMMY_PLACES.filter(place => place.creator === userId);

  return (
    <Container maxWidth="md">
      <PlaceList items={loadedPlace} />
    </Container>
  );
};

export default UserPlaces;
