import React from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import Menu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import { getUserInfoData } from '@/api'
import { useEffect } from 'react'
import { useUserStore } from '@/store'

const { Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const state = useUserStore()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await getUserInfoData()
    state.updateUserInfo(data)
  }

  return (
    <Watermark content='react'>
      <Layout>
        <Sider>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <Content className={styles.content}>
            {/* 二级路由出口 */}
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <Footer style={{ textAlign: 'center', height: '60px' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
