import {instance, ApiResponseType} from "./api";

type MeResponseDataType = {
  id: number,
  email: string,
  login: string
}

type LoginResponseDataType = {
  userId: number,
}

export const authApi = {
  me() {
    return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
  },
  login(email: string, password : string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<ApiResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};