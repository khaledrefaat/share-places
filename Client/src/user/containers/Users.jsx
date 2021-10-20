import React, { useEffect, useState } from 'react';

import CustomModal from '../../shared/components/UiElements/CustomModal';
import UserList from '../components/UserList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const sendHttpRequest = async () => {
      try {
        const res = await sendRequest(
          'http://localhost:5000/api/users/getusers'
        );
        setLoadedUsers(res.users);
      } catch (err) {
        console.log(err);
      }
    };
    sendHttpRequest();
  }, [sendRequest]);

  if (isLoading) return <CustomModal spinner={true} />;
  return (
    <div>
      {error ? <ErrorModal error={error} clearError={clearError} /> : null}
      {loadedUsers && <UserList items={loadedUsers} />}
    </div>
  );
};

export default Users;
