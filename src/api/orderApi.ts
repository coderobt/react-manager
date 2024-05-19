import { Order, ResultData } from '@/types/api'
import request from '@/utils/request'

// 获取订单列表
export const getOrderListAPI = (params: Order.Params) => {
  return request.get<ResultData<Order.OrderItem>>('/order/list', params)
}
