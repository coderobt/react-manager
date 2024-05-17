/**
 * 工具函数的封装
 *
 */

import { Menu } from '@/types/api'
import { it } from 'node:test'

//格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseInt(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

//格式化数字
export function formatNumber(num?: number | string) {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

//用户的状态转换
export const formatState = (state: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

// 获取页面路径，用到了递归生成路径 数组转化成树
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(
      Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + ''
    )
  }, [])
}
