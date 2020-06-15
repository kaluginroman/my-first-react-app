import {authApi, secureApi} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {id, email, login, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: SET_USER_DATA,
  payload: {captchaUrl}
});

export const getAuthUserData = () => (dispatch) => {
  return authApi.me()
    .then(response => {
      if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    })
};

export const login = (email, password, rememberMe, captcha) => (dispatch) => {
  authApi.login(email, password, rememberMe, captcha)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("Login", {_error: message}));
      }
    })
};

export const getCaptchaUrl = () => (dispatch) => {
  secureApi.getCaptchaUr()
    .then(response => {
      dispatch(getCaptchaUrlSuccess(response.data.url))
    })
};

export const logout = () => (dispatch) => {
  authApi.logout()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    })
};

export default authReducer;