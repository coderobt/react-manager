import { IDetailProp } from '@/types/modal'
import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { getOrderDetailAPI } from '@/api/orderApi'
import { message } from '@/utils/AntdGlobal'
import { Order } from '@/types/api'

const OrderRoute = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = async (orderId: string) => {
    const detail = await getOrderDetailAPI(orderId)
    if (detail.route.length > 0) {
      setVisible(true)
      setTimeout(() => {
        renderMap(detail)
      })
    } else {
      message.info('请先完成打点上报')
    }
  }

  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('orderRouteMap')
    map.centerAndZoom(detail.cityName, 17)
    map.enableScrollWheelZoom(true)

    const path = detail.route || []
    const point = []
    for (let i = 0; i < path.length; i++) {
      point.push(new window.BMapGL.Point(path[i].lng, path[i].lat))
    }

    const polyline = new window.BMapGL.Polyline(point, {
      strokeWeight: '8', //折线宽度，以像素为单位
      strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
      strokeColor: '#ed6c00' //折线颜色
    })
    setTimeout(start, 3000)
    function start() {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
        overallView: true,
        tilt: 30,
        duration: 20000,
        delay: 300
      })
      trackAni.start()
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal title='地图打点' width={1100} open={visible} footer={false} onCancel={handleCancel}>
      <div id='orderRouteMap' style={{ height: 500 }}></div>
    </Modal>
  )
}

export default OrderRoute
