import React from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import Menu from '@/components/Menu'
import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import { getUserInfoData } from '@/api'
import { useEffect } from 'react'
import { useUserStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { useLocation } from 'react-router-dom'
import TabsFC from '@/components/Tabs'

const { Footer, Sider } = Layout

const App: React.FC = () => {
  const { updateUserInfo, userInfo, collapsed } = useUserStore()
  const { pathname } = useLocation()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await getUserInfoData()
    updateUserInfo(data)
  }

  //页面权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const staticPath = ['/welcome', '/403', '/404']
  if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
    return <Navigate to='/403' />
  }
  return (
    <Watermark content='react'>
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Menu />
          </Sider>
          <Layout>
            <NavHeader />
            <TabsFC />
            {/* 二级路由出口 */}
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet />
              </div>
              <Footer style={{ textAlign: 'center', height: '60px' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </div>
          </Layout>
        </Layout>
      ) : null}
    </Watermark>
  )
}

export default App
