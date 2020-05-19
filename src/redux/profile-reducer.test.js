import {profileApi, usersApi} from "../API/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const SET_STATUS = "SET-STATUS";

let initialState = {
    postsData: [
        {
            id: "1",
            message: "Post text",
        },
    ],
    profile: null,
    status: '',
    isFetching: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE:{
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS:{
            return {
                ...state,
                status: action.status
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        
        default:
            return state; 
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) =>  (dispatch) => {
    usersApi.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
            dispatch(setIsFetching(false));
        })
};

export const getUserStatus = (userId) =>  (dispatch) => {
    profileApi.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        })
};

export const updateStatus = (status) =>  (dispatch) => {
    profileApi.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
};

export const setIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export default profileReducer;