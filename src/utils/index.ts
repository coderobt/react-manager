/**
 * 工具函数的封装
 *
 */

import { Menu } from '@/types/api'

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

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(
      Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + ''
    )
  }, [])
}

//手机号加密 运用正则表达式
export const formatPhone = (phone?: number | string) => {
  if (!phone) return '-'
  return phone.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

//递归查找树的路径从父级到子级
export const findTreeNode = (tree: Menu.MenuItem[], pathName: string, path: string[]): string[] => {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.menuName)
    if (data.path === pathName) {
      return path
    }
    if (data.children?.length) {
      const findChildren = findTreeNode(data.children, pathName, path)
      if (findChildren?.length) {
        return path
      }
    }
    path.pop()
  }
  return []
}
