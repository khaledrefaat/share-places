import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'one of the most famous sky bulding in the world',
    imageUrl:
      'https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    adress: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7481572,
      lng: -73.9848175,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'one of the most famous sky bulding in the world',
    imageUrl:
      'https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    adress: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7481572,
      lng: -73.9848175,
    },
    creator: 'u2',
  },
];

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
