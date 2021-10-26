import React, { Component } from 'react';

import UserItem from './UserItem';

import { userList } from './UserList.module.scss';

export class UserList extends Component {
  render() {
    if (this.props.length === 0)
      return (
        <div className="center">
          <h2>There is no items</h2>
        </div>
      );
    return (
      <ul className={`${userList}`}>
        {this.props.items.map((user, index) => (
          <UserItem
            key={index}
            id={user._id}
            img={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        ))}
      </ul>
    );
  }
}

export default UserList;
