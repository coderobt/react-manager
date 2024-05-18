import { IAuthLoader } from '@/router/AuthLoader'
import { useRouteLoaderData } from 'react-router-dom'
import { Button } from 'antd'
import { useUserStore } from '@/store'

const AuthButton = (props: any) => {
  const role = useUserStore(state => state.userInfo.role)
  const data = useRouteLoaderData('layout') as IAuthLoader
  if (!props.auth) return <Button {...props}>{props.children}</Button>
  if (data.buttonList.includes(props.auth) || role == 1) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}

export default AuthButton
