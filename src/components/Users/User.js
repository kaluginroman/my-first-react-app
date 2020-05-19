import React from 'react';
import userPhoto from '../../../src/assets/img/userPhoto.png';
import {NavLink} from 'react-router-dom';

let User = ({user, followingInProgress, unfollow, follow}) => {
  return (
    <div className="user-card">
      <NavLink to={'/profile/' + user.id}>
        <img className="user-card__img" src={user.photos.large ? user.photos.large : userPhoto} alt="avatar"/>
      </NavLink>
      <p className="user-card__title">{user.name}</p>
      <p className="user-card__status">{user.status}</p>
      {
        user.followed ?
          <button
            disabled={followingInProgress.some(id => id === user.id)}
            onClick={() => {
              unfollow(user.id)
            }}
            className="user-card__btn"
          >Unfollow</button> :
          <button
            disabled={followingInProgress.some(id => id === user.id)}
            onClick={() => {
              follow(user.id)
            }}
            className="user-card__btn"
          >Follow</button>
      }
    </div>
  )
};

export default User;