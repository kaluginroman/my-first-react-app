import {FormAction, stopSubmit} from "redux-form";
import {PostType, ProfileType, PhotosType} from "../types/types";
import {profileApi} from "../API/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  postsData: [
    {id: 1, message: "Post text"}
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  isFetching: false,
  newPostText: ""
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: "SN/PROFILE/ADD-POST",
    newPostText
  } as const),
  setUserProfile: (profile: ProfileType) => ({type: "SN/PROFILE/SET-USER-PROFILE", profile} as const),
  setStatus: (status: string) => ({type: "SN/PROFILE/SET-STATUS", status} as const),
  deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE-POST", postId} as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: "SN/PROFILE/SAVE-PHOTO-SUCCESS",
    photos
  } as const),
  setIsFetching: (isFetching: boolean) => ({type: "SN/PROFILE/TOGGLE-IS-FETCHING", isFetching} as const),
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
      let post = {
        id: 5,
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [...state.postsData, post],
        newPostText: ''
      };
    }
    case "SN/PROFILE/DELETE-POST": {
      return {
        ...state,
        postsData: [...state.postsData.filter((post) => (post.id !== action.postId))],
      };
    }
    case "SN/PROFILE/SET-USER-PROFILE": {
      return {
        ...state,
        profile: action.profile
      }
    }
    case "SN/PROFILE/SET-STATUS": {
      return {
        ...state,
        status: action.status
      }
    }
    case "SN/PROFILE/SAVE-PHOTO-SUCCESS": {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    }
    case "SN/PROFILE/TOGGLE-IS-FETCHING": {
      return {...state, isFetching: action.isFetching}
    }

    default:
      return state;
  }
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileApi.getProfile(userId);
  dispatch(actions.setUserProfile(response));
  dispatch(actions.setIsFetching(false));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileApi.getStatus(userId);
  dispatch(actions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let response = await profileApi.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let response = await profileApi.savePhoto(file);
  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let response = await profileApi.saveProfile(profile);
  if (response.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId can't be null");
    }
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}));
    return Promise.reject(response.messages[0]);
  }
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>