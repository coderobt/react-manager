import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome'></Navigate>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
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
