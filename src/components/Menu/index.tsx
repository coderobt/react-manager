import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store'
import type { MenuProps } from 'antd/es/menu'
import React, { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['params'])
  const collapsed = useUserStore(state => state.collapsed)
  const nav = useNavigate()
  const params = useLocation()
  console.log(params)

  //Logo点击
  const handleClickLogo = () => {
    nav('/welcome')
  }

  //优先加载load
  const data: any = useRouteLoaderData('layout')
  // console.log('data', data)

  // const items = [
  //   {
  //     label: '工作台',
  //     key: '/dashboard',
  //     icon: <DesktopOutlined />
  //   },
  //   {
  //     label: '系统管理',
  //     key: '2',
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         label: '用户管理',
  //         key: '3',
  //         icon: <TeamOutlined />
  //       },
  //       {
  //         label: '部门管理',
  //         key: '4',
  //         icon: <TeamOutlined />
  //       }
  //     ]
  //   }
  // ]

  //生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  // 不用getItem的写法
  // menuList.forEach((item, index) => {
  //   if (item.menuType === 1) {
  //     if (item.buttons) {
  //       treeList.push({
  //         label: item.menuName,
  //         key: item.path || index,
  //         icon: addIcon(item.menuName)
  //       })
  //     } else {
  //       treeList.push({
  //         label: item.menuName,
  //         key: item.path || index,
  //         icon: addIcon(item.menuName),
  //         children: getTreeMenu(item.children || [])
  //       })
  //     }
  //   }
  // })

  //递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          treeList.push(getItem(item.menuName, item.path || index, addIcon(item.menuName)))
        } else {
          treeList.push(
            getItem(
              item.menuName,
              item.path || index,
              addIcon(item.menuName),
              getTreeMenu(item.children || [])
            )
          )
        }
      }
    })
    return treeList
  }

  const customIcons: { [key: string]: any } = Icons
  const addIcon = (name?: string) => {
    if (!name) return <></>
    const icon = customIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  //初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([params.pathname])
  }, [])

  //菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    nav(key)
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span className={styles['logo-text']}>暮暮货物</span>}
      </div>
      <Menu
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        style={{ width: collapsed ? 80 : 'auto' }}
        mode='inline'
        theme='dark'
        items={menuList}
      />
    </div>
  )
}

export default SideMenu
