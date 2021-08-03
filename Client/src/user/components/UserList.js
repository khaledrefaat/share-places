import React, { Component } from 'react';

import UserItem from './UserItem';

import { userList } from './UserList.module.scss';

export class UserList extends Component {
  render() {
    console.log(this.props.length);
    if (this.props.length === 0)
      return (
        <div className="d-flex justify-content-center align-items-center text-center">
          <h2>There is no items</h2>
        </div>
      );
    return (
      <ul className={`d-flex justify-content-around ${userList}`}>
        {this.props.items.map(user => (
          <UserItem
            key={user.id}
            id={user.id}
            img={user.image}
            name={user.name}
            placeCount={user.places}
          />
        ))}
      </ul>
    );
  }
}

export default UserList;
