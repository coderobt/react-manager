import React from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import Menu from '@/components/Menu'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import { getUserInfoData } from '@/api'
import { useEffect } from 'react'
import { useUserStore } from '@/store'

const { Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const { updateUserInfo, collapsed } = useUserStore()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await getUserInfoData()
    updateUserInfo(data)
  }

  //优先加载load
  const data = useRouteLoaderData('layout')
  console.log('data', data)

  return (
    <Watermark content='react'>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          {/* 二级路由出口 */}
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <Footer style={{ textAlign: 'center', height: '60px' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
function userRouteLoaderData(arg0: string) {
  throw new Error('Function not implemented.')
}
