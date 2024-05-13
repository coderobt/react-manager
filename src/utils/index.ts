/**
 * 工具函数的封装
 *
 */

//格式化金额
export const formatMoney = (num: number | string) => {
  const a = parseInt(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

//格式化数字
export function formatNumber(num: number | string) {
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

//日期格式化直接安装dayjs插件
