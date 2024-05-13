import { RouterProvider } from 'react-router'
import router from './router'
import { ConfigProvider } from 'antd'
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#ed6c00'
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
