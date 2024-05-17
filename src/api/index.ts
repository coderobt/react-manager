import request from '@/utils/request'
import { LoginParams, User, Dashboard, ResultData, Dept, Menu } from '@/types/api'

//登录
export const login = (params: LoginParams) => {
  return request.post('/users/login', params, { showLoading: false })
}

// 获取用户信息
export const getUserInfoData = () => {
  return request.get<User.UserItem>('/users/getUserInfo')
}

//获取权限列表
export const getPermissionListAPI = () => {
  return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
    '/users/getPermissionList'
  )
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

//编辑用户
export const editUserAPI = (params: User.EditParam) => {
  return request.post('/users/edit', params)
}

//删除和批量删除用户
export const delUserAPI = (params: { userIds: number[] }) => {
  return request.post('/users/delete', params)
}

//部门列表
export const getDeptListAPI = (params?: Dept.Params) => {
  return request.get<Dept.DeptItem[]>('/dept/list', params)
}

//获取当前账号下的所有用户
export const getAllUserListAPI = () => {
  return request.get<User.UserItem[]>('/users/all/list')
}

//创建部门
export const createDeptAPI = (params: Dept.CreateParams) => {
  return request.post('dept/create', params)
}

//修改部门
export const editDeptAPI = (params: Dept.EditParams) => {
  return request.post('dept/edit', params)
}

//删除部门
export const deleteDeptAPI = (params: Dept.DelParams) => {
  return request.post('dept/delete', params)
}

//菜单管理
export const getMenuListAPI = (params?: Menu.Params) => {
  return request.get<Menu.MenuItem[]>('/menu/list', params)
}

//菜单创建
export const createMenuAPI = (params: Menu.CreateParams) => {
  return request.post('/menu/create', params)
}

//编辑菜单
export const editMenuAPI = (params: Menu.EditParams) => {
  return request.post('menu/edit', params)
}

//删除菜单
export const delMenuAPI = (params: Menu.DelParams) => {
  return request.post('menu/delete', params)
}
