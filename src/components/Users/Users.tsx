import React from "react";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import './Users.css';
import {UsersType} from "../../types/types";

type PropsType = {
  isFetching: boolean,
  users: Array<UsersType>,
  followingInProgress: Array<number>,
  unfollow: (userId: number) => void,
  follow: (userId: number) => void,
  onPageChanged: (pageNumber: number) => void,
  currentPage: number,
  totalUsersCount: number,
  pageSize: number
}

let Users: React.FC<PropsType> = ({isFetching, users, followingInProgress, unfollow, follow, ...props}) => {
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
        portionSize={10}
      />
    </>
  )
};

export default Users;