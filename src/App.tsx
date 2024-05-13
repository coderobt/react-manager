import { RouterProvider } from 'react-router'
import router from './router'
import { ConfigProvider, App as AntdApp } from 'antd'
import './App.css'
import AntdGlobal from './utils/AntdGlobal'

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
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
