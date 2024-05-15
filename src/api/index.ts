import request from '@/utils/request'
import { LoginParams, User, Dashboard } from '@/types/api'

//登录
export const login = (params: LoginParams) => {
  return request.post('/users/login', params, { showLoading: false })
}

// 获取用户信息
export const getUserInfoData = () => {
  return request.get<User.UserItem>('/users/getUserInfo')
}

// 获取工作台报表
export const getReportData = () => {
  return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
}
