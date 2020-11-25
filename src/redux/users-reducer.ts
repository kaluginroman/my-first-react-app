import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/types";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {Dispatch} from "redux";
import {usersApi} from "../API/users-api";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 8,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
      }
    }

    case "SN/USERS/UNFOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
      }
    }

    case "SN/USERS/SET_USERS": {
      return {...state, users: action.users}
    }

    case "SN/USERS/SET_CURRENT_PAGE": {
      return {...state, currentPage: action.currentPage}
    }

    case "SN/USERS/SET_TOTAL_USERS_COUNT": {
      return {...state, totalUsersCount: action.totalUsersCount}
    }

    case "SN/USERS/TOGGLE_IS_FETCHING": {
      return {...state, isFetching: action.isFetching}
    }

    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
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

export const actions = {
  followSuccess: (userId: number) => ({type: "SN/USERS/FOLLOW", userId} as const),
  unfollowSuccess: (userId: number) => ({type: "SN/USERS/UNFOLLOW", userId} as const),
  setUsers: (users: Array<UsersType>) => ({type: "SN/USERS/SET_USERS", users} as const),
  setCurrentPage: (currentPage: number) => ({
    type: "SN/USERS/SET_CURRENT_PAGE",
    currentPage
  } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: "SN/USERS/SET_TOTAL_USERS_COUNT",
    totalUsersCount
  } as const),
  setIsFetching: (isFetching: boolean) => ({type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching} as const),
  setFollowingInProgress: (followingInProgress: boolean, userId: number) => ({
    type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
    followingInProgress,
    userId
  } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await usersApi.getUsers(page, pageSize);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setIsFetching(false));
  }
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
  dispatch(actions.setFollowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.setFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(userId), actions.followSuccess)
  }
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(userId), actions.unfollowSuccess)
  }
};

export default usersReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;