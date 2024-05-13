import { Breadcrumb, Space, Switch, Dropdown } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'

const NavHeader = () => {
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
      label: '邮箱: yinwt1018@mails.ccnu.deu.cn'
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
          <span className={styles.nickName}>ywt1018</span>
        </Dropdown>
      </Space>
    </div>
  )
}

export default NavHeader
