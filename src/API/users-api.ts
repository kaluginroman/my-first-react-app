import {instance, GetItemsType, ApiResponseType} from "./api";

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(responce => responce.data);
  },
  follow(userId: number) {
    return instance.post<ApiResponseType>(`follow/${userId}`).then(res => res.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ApiResponseType>;
  }
};