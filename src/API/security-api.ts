import {ApiResponseType, instance} from "./api";

type GetCaptchaUrlResponseType = {
  url: string
}

export const secureApi = {
  getCaptchaUr() {
    return instance.get<ApiResponseType<GetCaptchaUrlResponseType>>(`security/get-captcha-url`).then(res => res.data);
  },
};