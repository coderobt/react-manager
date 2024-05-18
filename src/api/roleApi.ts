import request from '@/utils/request'
import { Role, ResultData } from '@/types/api'

//获取角色列表
export const getRoleListAPI = (params: Role.Params) => {
  return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
}

//创建角色
export const createRoleAPI = (params: Role.CreateParams) => {
  return request.post('/roles/create', params)
}

//编辑角色
export const editRoleAPI = (params: Role.EditParam) => {
  return request.post('/roles/edit', params)
}
