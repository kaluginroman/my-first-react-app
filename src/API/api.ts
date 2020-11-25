import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY' : '85c120d7-4cda-404d-9bcd-abb428f097f3'},
});

export enum ResultCodesEnum {
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number,
    error: string | null,
}

export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>
    resultCode: RC
}