import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import PlaceList from '../components/PlaceList';

import { useHttpClient } from '../../shared/hooks/http-hook';
import CustomModal from '../../shared/components/UiElements/CustomModal';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';

const UserPlaces = () => {
  const { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/places/users/${userId}`
        );
        setUserPlaces(res.userWithPlaces.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const onPlaceDeleteHandler = deletedPlaceId => {
    setUserPlaces(pervPlaces =>
      pervPlaces.filter(place => place._id !== deletedPlaceId)
    );
  };

  if (isLoading) return <CustomModal spinner={true} />;

  return (
    <Container>
      {error ? <ErrorModal error={error} clearError={clearError} /> : null}
      {userPlaces && (
        <PlaceList items={userPlaces} onPlaceDelete={onPlaceDeleteHandler} />
      )}
    </Container>
  );
};

export default UserPlaces;
