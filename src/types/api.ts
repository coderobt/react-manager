// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface LoginParams {
  userName: string
  userPwd: string
}
