import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
  follow,
  unfollow,
  setCurrentPage,
  setFollowingInProgress,
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


class UsersContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingInProgress,
    requestUsers
  })
)(UsersContainer)