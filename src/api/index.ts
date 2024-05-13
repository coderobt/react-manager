import request from '@/utils/request'
import { LoginParams } from '@/types/api'

export const login = (params: LoginParams) => {
  return request.post('/users/login', params)
}
