import styles from './index.module.less'
import { Typography, Form, Button, Input, App } from 'antd'
import { login } from '@/api'
import { LoginParams } from '@/types/api'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { Title } = Typography

export default function Login() {
  const { message, modal, notification } = App.useApp()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginParams) => {
    setLoading(true)
    const data: any = await login(values)
    setLoading(false)
    storage.set('token', data)
    message.success('登录成功')
    const params = new URLSearchParams(location.search)
    console.log(params.get('callback'))
    nav(params.get('callback') || '/')
  }

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
          <Form.Item
            name='userName'
            label='用户名'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='userPwd'
            label='密码'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type='primary' block htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
