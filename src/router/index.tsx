import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router'
import Login from '@/views/login/Login'
import Welcome from '@/views/Welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
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
