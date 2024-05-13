import request from '@/utils/request'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    request.post('/users/login', {
      id: 12345
    })
  }, [])
  return <div>登录</div>
}
