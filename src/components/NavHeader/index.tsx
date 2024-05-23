import { Space, Switch, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useUserStore } from '@/store'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import BreadCrumb from './BreadCrumb'
const NavHeader = () => {
  // const userInfo = useUserStore(state => state.userInfo)
  // const collapsed = useUserStore(state => state.collapsed)
  const nav = useNavigate()
  const { userInfo, collapsed, updateCollapsed, token } = useUserStore()

  const handleLogout = () => {
    storage.remove('token')
    nav('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `邮箱: ${userInfo.userEmail}`
    },
    {
      key: '2',
      label: <span onClick={handleLogout}>退出</span>
    }
  ]

  //控制菜单图表关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed()
  }

  return (
    <div className={styles.NavHeader}>
      <Space>
        <div onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumb />
      </Space>
      <Space>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </Space>
    </div>
  )
}

export default NavHeader
