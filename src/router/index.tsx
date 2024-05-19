import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'
import DashBoard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'
import Menu from '@/views/system/menu'
import AuthLoader from './AuthLoader'
import Role from '@/views/system/role'
import OrderList from '@/views/order/OrderList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/userList',
        element: <User />
      },
      {
        path: '/deptList',
        element: <Dept />
      },
      {
        path: '/menuList',
        element: <Menu />
      },
      {
        path: '/roleList',
        element: <Role />
      },
      {
        path: '/orderList',
        element: <OrderList />
      }
    ]
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
])

export default router
