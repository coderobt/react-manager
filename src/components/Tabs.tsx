import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'

interface TabsItem {
  key: string
  label: string
  closable: boolean
}

const TabsFC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [activeKey, setActiveKey] = useState<string>('')
  const [tabsList, setTabList] = useState<TabsItem[]>([
    {
      key: '/welcome',
      label: '首页',
      closable: false
    }
  ])
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    addTabs()
  }, [pathname])

  //创建也签
  const addTabs = () => {
    const route = searchRoute(pathname, data.menuList)
    if (!route) return
    if (!tabsList.find(item => item.key == route.path)) {
      tabsList.push({
        key: route.path,
        label: route.menuName,
        closable: pathname !== '/welcome'
      })
    }
    setTabList([...tabsList])
    setActiveKey(route.path)
  }

  //路由切换
  const handleChange = (path: string) => {
    nav(path)
  }

  //删除标签
  const handleDel = (path: string) => {
    if (pathname === path) {
      tabsList.forEach((item, index: number) => {
        if (item.key != pathname) return
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (!nextTab) return
        nav(nextTab.key)
      })
    }
    setTabList(tabsList.filter(item => item.key !== path))
  }

  return (
    <Tabs
      activeKey={activeKey}
      items={tabsList}
      type='editable-card'
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: '#fff' }}
      hideAdd
      onChange={handleChange}
      onEdit={path => handleDel(path as string)}
    />
  )
}

export default TabsFC
