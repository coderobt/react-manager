import { Result, Button } from 'antd'
import { useNavigate } from 'react-router'

function NotFound() {
  const nav = useNavigate()
  const handleClick = () => {
    nav('/')
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='抱歉，您访问的页面不存在'
      extra={
        <Button type='primary' onClick={handleClick}>
          回首页
        </Button>
      }
    />
  )
}

export default NotFound
