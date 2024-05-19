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
