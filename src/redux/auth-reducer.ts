import {authApi, secureApi} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";

export type InitialStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
};

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {id, email, login, isAuth}
});

type getCaptchaUrlSuccess = {
  type: typeof SET_USER_DATA,
  payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccess => ({
  type: SET_USER_DATA,
  payload: {captchaUrl}
});

export const getAuthUserData = () => (dispatch: any) => {
  return authApi.me()
    .then((response: any) => {
      if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    })
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => (dispatch: any) => {
  authApi.login(email, password, rememberMe, captcha)
    .then((response: any) => {
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

export const getCaptchaUrl = () => (dispatch: any) => {
  secureApi.getCaptchaUr()
    .then((response: any) => {
      dispatch(getCaptchaUrlSuccess(response.data.url))
    })
};

export const logout = () => (dispatch: any) => {
  authApi.logout()
    .then((response: any) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    })
};

export default authReducer;