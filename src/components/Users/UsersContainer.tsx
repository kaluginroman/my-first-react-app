import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
  follow,
  unfollow,
  requestUsers
} from '../../redux/users-reducer';
import {compose} from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetchibg,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
  currentPage: number,
  pageSize: number,
  totalUsersCount: number,
  isFetching: boolean,
  followingInProgress: Array<number>
  users: Array<UsersType>,
}

type MapDispatchPropsType = {
  requestUsers: (currentPage: number, pageSize: number) => void,
  unfollow: (userId: number) => void,
  follow: (userId: number) => void,
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props
    this.props.requestUsers(pageNumber, pageSize);
  };

  render() {

    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        isFetching={this.props.isFetching}
        followingInProgress={this.props.followingInProgress}
      />
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetchibg(state),
    followingInProgress: getFollowingInProgress(state),
  }
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
  })
)(UsersContainer);