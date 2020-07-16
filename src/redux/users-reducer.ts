import {usersApi} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 8,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<string>,
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
      }
    }

    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
      }
    }

    case SET_USERS: {
      return {...state, users: action.users}
    }

    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }

    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.totalUsersCount}
    }

    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching}
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }

    default:
      return state;
  }
};

type FollowSuccessActionType = {
  type: typeof FOLLOW,
  userId: string
}
export const followSuccess = (userId: string): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessACtionType = {
  type: typeof UNFOLLOW,
  userId: string
}
export const unfollowSuccess = (userId: string): UnfollowSuccessACtionType => ({type: UNFOLLOW, userId});
type SetUsersActionType = {
  type: typeof SET_USERS,
  users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users});
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount
});
type SetIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type SetFollowingInProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  followingInProgress: boolean,
  userId: string
}
export const setFollowingInProgress = (followingInProgress: boolean, userId: string): SetFollowingInProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  followingInProgress,
  userId
});


export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersApi.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setIsFetching(false));
  }
};

const followUnfollowFlow = async (dispatch: any, userId: string, apiMethod: any, actionCreator: any) => {
  dispatch(setFollowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingInProgress(false, userId));
}

export const follow = (userId: string) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersApi.follow.bind(userId), followSuccess)
  }
};

export const unfollow = (userId: string) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(userId), unfollowSuccess)
  }
};


export default usersReducer;