import { IDetailProp } from '@/types/modal'
import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { getOrderDetailAPI, updateOderInfoAPI } from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

const OrderMarker = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [markers, setMarkers] = useState<{ lng: string; lat: string; id: number }[]>([])

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  //弹框
  const open = async (orderId: string) => {
    setVisible(true)
    setOrderId(orderId)
    const detail = await getOrderDetailAPI(orderId)
    renderMap(detail)
  }

  //渲染地图
  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('markerMap')
    map.centerAndZoom(detail.cityName, 12)
    map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    let scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    let zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
    map.addControl(zoomCtrl)
    let cityCtrl = new window.BMapGL.CityListControl() // 添加城市列表控件
    map.addControl(cityCtrl)
    detail.route?.map(item => {
      createMarker(map, item.lng, item.lat)
    })

    //绑定事件
    map.addEventListener('click', function (e: any) {
      //lat 纬度 和 lng 经度 是经纬度
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  //创建marker
  const createMarker = (map: any, lng: string, lat: string) => {
    const id = Math.random()
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    markers.push({ lng, lat, id })
    // const markerItem = { lng, lat, id }
    // flushSync(() => {
    //   setMarkers([...markers, markerItem])
    // })
    // setMarkers([...markers, markerItem])
    marker.id = id
    const markerMenu = new window.BMapGL.ContextMenu()
    markerMenu.addItem(
      new window.BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        const index = markers.findIndex(item => item.id === marker.id)
        markers.splice(index, 1)
        setMarkers([...markers])
        // const newArr = markers.filter(item => item.id !== markerItem.id)
        // setMarkers(newArr)
      })
    )
    setMarkers([...markers])
    marker.addContextMenu(markerMenu)
    map.addOverlay(marker)
  }

  // 更新打点
  const handleOk = async () => {
    await updateOderInfoAPI({
      orderId,
      route: [...markers]
    })
    setVisible(false)
    message.success('打点成功')
  }

  //关闭弹框
  const handleCancel = () => {
    setVisible(false)
    //每次关闭弹框需要清除缓存否则一个点需要删除多次才能删除
    setMarkers([])
  }

  return (
    <Modal
      title='地图打点'
      width={1100}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='markerMap' style={{ height: 500 }}></div>
    </Modal>
  )
}

export default OrderMarker
