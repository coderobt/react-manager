import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const nav = useNavigate()
  const handleClick = () => {
    nav('/welcome')
  }

  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  return (
    <div>
      <div className={styles.logo} onClick={handleClick}>
        <img src='/imgs/logo.png' className={styles.img} />
        <span>暮暮货物</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}

export default SideMenu
