import React from "react";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import './Users.css';

let Users = ({isFetching, users, followingInProgress, unfollow, follow, ...props}) => {
  return (
    <>
      <div className="App-users">
        {isFetching ? <Preloader/> : null}
        {
          users.map(user => {
            return (
              <User
                key={user.id}
                user={user}
                followingInProgress={followingInProgress}
                unfollow={unfollow}
                follow={follow}
              />
            )
          })
        }
      </div>
      <Paginator
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
    </>
  )
};

export default Users;