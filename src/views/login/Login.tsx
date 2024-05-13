import styles from './index.module.less'
import { Typography, Form, Button, Input } from 'antd'

const { Title } = Typography

export default function Login() {
  const onFinish = () => {}

  return (
    <div className={styles.login}>
      <div className={styles['login-wrapper']}>
        <Title style={{ textAlign: 'center' }} level={2}>
          用户登录
        </Title>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item label='用户名' rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item label='密码' rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
