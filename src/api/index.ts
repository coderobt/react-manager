import request from '@/utils/request'
import { LoginParams, User } from '@/types/api'

export const login = (params: LoginParams) => {
  return request.post('/users/login', params, { showLoading: false })
}

export const getUserInfoData = () => {
  return request.get<User.UserItem>('/users/getUserInfo')
}
