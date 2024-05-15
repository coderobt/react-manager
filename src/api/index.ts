import request from '@/utils/request'
import { LoginParams, User, Dashboard, ResultData } from '@/types/api'

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
  return request.get<Dashboard.ReportData>('/order/dashboard/getLineData')
}

// 获取折线图
export const getLineData = () => {
  return request.get<Dashboard.lineData>('/order/dashboard/getLineData')
}

export const getPieCityData = () => {
  return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
}

//获取饼图
export const getPieAgeData = () => {
  return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
}

//获取雷达图
export const getRadarData = () => {
  return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
}

//获取用户列表
export const getUserList = (params: User.Params) => {
  return request.get<ResultData<User.UserItem>>('/users/list', params)
}

//创建用户
export const createUserAPI = (params: User.CreateParam) => {
  return request.post('/users/create', params)
}
