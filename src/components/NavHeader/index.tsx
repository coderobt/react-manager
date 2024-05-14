import { Breadcrumb, Space, Switch, Dropdown } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useUserStore } from '@/store'

const NavHeader = () => {
  const userInfo = useUserStore(state => state.userInfo)
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `邮箱: ${userInfo.userEmail}`
    },
    {
      key: '2',
      label: '退出'
    }
  ]

  return (
    <div className={styles.NavHeader}>
      <Space>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} />
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
