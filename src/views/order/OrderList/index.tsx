import { Button, Table, Form, Input, Select, Space, Modal, message } from 'antd'
import { useAntdTable } from 'ahooks'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import { Order } from '@/types/api'
import { getOrderListAPI, delOrderAPI, exportData } from '@/api/orderApi'
import { useRef } from 'react'
import CreateOrder from './components/CreateOrderNew'
import OrderDetail from './components/OrderDetail'
import OrderMarker from './components/OrderMarker'
import OrderRoute from './components/OrderRoute'

const OrderList = () => {
  const [form] = Form.useForm()
  const orderRef = useRef<{
    open: () => void
  }>()
  const detailRef = useRef<{
    open: (orderId: string) => void
  }>()
  const markerRef = useRef<{
    open: (orderId: string) => void
  }>()
  const routeRef = useRef<{
    open: (orderId: string) => void
  }>()

  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Order.SearchParams
  ) => {
    return getOrderListAPI({
      ...formData,
      pageNum: current,
      pageSize: pageSize
    }).then(data => {
      return {
        total: data.page.total,
        list: data.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultParams: [{ current: 1, pageSize: 10 }, { state: 1 }]
  })

  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      width: 80,
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      width: 160,
      dataIndex: 'startAddress',
      key: 'startAddress',
      render(_, record) {
        return (
          <Space direction='vertical'>
            <p>开始地址:{record.startAddress}</p>
            <p>结束地址:{record.endAddress}</p>
          </Space>
        )
      }
    },
    {
      title: '下单时间',
      width: 120,
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount'
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return { 1: '进行中', 2: '已完成', 3: '超时', 4: '取消' }[state]
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleDetail(record.orderId)}>
              详情
            </Button>
            <Button type='text' onClick={() => handleMarker(record.orderId)}>
              打点
            </Button>
            <Button type='text' onClick={() => handleRoute(record.orderId)}>
              轨迹
            </Button>
            <Button type='text' danger onClick={() => handleDel(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //创建订单
  const handleCreate = () => {
    orderRef.current?.open()
  }

  const handleDetail = (orderId: string) => {
    detailRef.current?.open(orderId)
  }

  //地图打点
  const handleMarker = (orderId: string) => {
    markerRef.current?.open(orderId)
  }

  //行驶轨迹
  const handleRoute = (orderId: string) => {
    routeRef.current?.open(orderId)
  }

  //删除确认
  const handleDel = (_id: string) => {
    Modal.confirm({
      title: '确认',
      content: <span>确认删除订单嘛?</span>,
      onOk: async () => {
        await delOrderAPI(_id)
        message.success('删除成功')
        search.submit()
      }
    })
  }

  //文件导出
  const handleExport = async () => {
    await exportData(form.getFieldsValue())
  }

  return (
    <div className='OrderList'>
      <Form form={form} className='search-form' layout='inline'>
        <Form.Item label='订单编号' name='orderId'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='订单状态' name='state'>
          <Select style={{ width: '120px' }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜素
            </Button>
            <Button type='primary' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' onClick={handleExport}>
              导出
            </Button>
          </div>
        </div>
        <Table rowKey='_id' bordered columns={columns} {...tableProps} />
      </div>
      {/* 创建订单组件 */}
      <CreateOrder mRef={orderRef} update={search.submit} />
      {/* 订单详情 */}
      <OrderDetail mRef={detailRef} />
      {/* 地图打点 */}
      <OrderMarker mRef={markerRef} />
      {/* 行驶轨迹 */}
      <OrderRoute mRef={routeRef} />
    </div>
  )
}

export default OrderList
