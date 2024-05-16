// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
}

export interface LoginParams {
  userName: string
  userPwd: string
}

//用户管理
export namespace User {
  export interface Params extends PageParams {
    userId?: string
    userName?: string
    state?: number
  }

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

  export interface CreateParam {
    userName: string
    userEmail: string
    mobile?: string
    deptId: string
    jos?: string
    state?: number
    roleList: string[]
    userImg: string
  }

  export interface EditParam extends CreateParam {
    userId: number
  }
}

//部门管理
export namespace Dept {
  export interface Params {
    deptName?: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    userName: string
    parentId: string
    children: DeptItem[]
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }

  export interface lineData {
    label: string[]
    order: number[]
    money: number[]
  }

  export interface PieData {
    value: number
    name: string
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}
