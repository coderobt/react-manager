import request from '@/utils/request'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    request
      .post<string>('/users/login', {
        id: 12345
      })
      .then(res => {
        let token = res
      })
  }, [])
  return <div>登录</div>
}
