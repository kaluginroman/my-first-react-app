import {ResultCodesEnum} from "../API/api";
import {FormAction, stopSubmit} from "redux-form";
import {authApi} from "../API/auth-api";
import {secureApi} from "../API/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  id: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/auth/SET-USER-DATA":
      return {
        ...state,
        ...action.payload
      };
    case "SN/auth/GET-CAPTCHA-URL-SUCCESS":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "SN/auth/SET-USER-DATA",
    payload: {id, email, login, isAuth}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "SN/auth/GET-CAPTCHA-URL-SUCCESS",
    payload: {captchaUrl}
  } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authApi.me();
  if (meData.resultCode === ResultCodesEnum.Succes) {
    let {id, email, login} = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const response = await authApi.login(email, password, rememberMe, captcha);
  if (response.resultCode === ResultCodesEnum.Succes) {
    dispatch(getAuthUserData());
  } else {
    if (response.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
    dispatch(stopSubmit("Login", {_error: message}));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await secureApi.getCaptchaUr();
  const captchaUrl = response.data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;