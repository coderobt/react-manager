import { Order, ResultData } from '@/types/api'
import request from '@/utils/request'

// 获取订单列表
export const getOrderListAPI = (params: Order.Params) => {
  return request.get<ResultData<Order.OrderItem>>('/order/list', params)
}

//获取城市列表
export const getCityListAPI = () => {
  return request.get<Order.DictItem[]>('/order/cityList')
}

//获取城市列表
export const getVehicleListAPI = () => {
  return request.get<Order.DictItem[]>('/order/vehicleList')
}

//创建订单
export const createOrderAPI = (params: Order.CreateParams) => {
  return request.post('/order/create', params)
}

//获取订单详情
export const getOrderDetailAPI = (orderId: string) => {
  return request.get<Order.OrderItem>(`/order/detail/${orderId}`)
}

//更新订单信息
export const updateOderInfoAPI = (params: Order.OrderRoute) => {
  return request.post('/order/edit', params)
}

//删除订单
export const delOrderAPI = (orderId: string) => {
  return request.post('/order/delete', { _id: orderId })
}

//导出接口
export const exportData = (params: Order.SearchParams) => {
  return request.downloadFile('/order/orderExport', params, '订单列表.xlsx')
}

//获取城市聚合点数据
export const getCityDataAPI = (cityId: number) => {
  return request.get<Array<{ lng: string; lat: string }>>(`/order/cluster/${cityId}`)
}

//获取司机列表
export const getDriverListAPI = (params: Order.DriverParams) => {
  return request.get<ResultData<Order.DriverItem>>('/order/driver/list', params)
}
