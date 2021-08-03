import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1517241938558-898c3afe02c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jonas Svidras',
      places: 5,
    },
  ];
  return (
    <div>
      <UserList items={USERS} />
    </div>
  );
};

export default Users;
