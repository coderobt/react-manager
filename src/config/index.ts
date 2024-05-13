/**
 * 环境配置封装
 *
 */

type ENV = 'dev' | 'prd' | 'stg'

const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    mock: false,
    mockApi: ''
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    mock: false,
    mockApi: ''
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    mock: false,
    mockApi: ''
  }
}

export default {
  env,
  ...config[env]
}
