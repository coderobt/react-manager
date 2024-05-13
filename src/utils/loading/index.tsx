import ReactDom from 'react-dom/client'
import Loading from './loading'

let count = 0
export const showLoading = () => {
  //一个页面有多个请求的时候，只显示一个loading
  if (count === 0) {
    // 创建<div id="loading"></div>
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDom.createRoot(loading).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) {
    document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
  }
}
