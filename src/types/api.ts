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

export namespace User {
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    mobile?: string
    deptId: string
    deptName?: string
    job?: string
    state: number
    role: number
    roleList: string
    createId: number
    userImg: string
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
}