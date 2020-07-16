import {profileApi, usersApi} from "../API/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfileType, PhotosType} from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const SET_STATUS = "SET-STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";

let initialState = {
  postsData: [
    {
      id: "1",
      message: "Post text",
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  isFetching: false,
  newPostText: ""
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let post = {
        id: "5",
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [...state.postsData, post],
        newPostText: ''
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postsData: [...state.postsData.filter((post) => (post.id !== action.postId))],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching}
    }

    default:
      return state;
  }
};

type addPostActionCreatorActionType = {
  type: typeof ADD_POST,
  newPostText: string,
}

export const addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostText
});
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
type SetStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});
type DeletePostActionType = {
  type: typeof DELETE_POST,
  postId: string
}
export const deletePost = (postId: string): DeletePostActionType => ({type: DELETE_POST, postId});
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUserProfile = (userId: string) => async (dispatch: any) => {
  let response = await usersApi.getProfile(userId);
  dispatch(setUserProfile(response.data));
  dispatch(setIsFetching(false));
};

export const getUserStatus = (userId: string) => async (dispatch: any) => {
  let response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileApi.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileApi.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  let response = await profileApi.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0]);
  }
};
type SetIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});

export default profileReducer;