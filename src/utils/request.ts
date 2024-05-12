import { message } from 'antd'
import axios, { AxiosError } from 'axios'

//创建实例
const instance = axios.create({
  baseURL: 'api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  //默认跨域的
  withCredentials: true
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code === 500001) {
      message.error(data.message)
      localStorage.removeItem('token')
      location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

//axios的请求封装
export default {
  get(url: string, params: any) {
    return axios.get(url, { params })
  },
  post(url: string, params: any) {
    return axios.post(url, params)
  }
}
