import { Button, Table, Form, Input, Select, Space } from 'antd'
import { useAntdTable } from 'ahooks'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import { Order } from '@/types/api'
import { getOrderListAPI } from '@/api/orderApi'

const OrderList = () => {
  const [form] = Form.useForm()

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
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderMount',
      key: 'orderMount'
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state'
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
            <Button type='text'>详情</Button>
            <Button type='text'>打点</Button>
            <Button type='text'>轨迹</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

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
            <Button type='primary'>新增</Button>
          </div>
        </div>
        <Table rowKey='userId' bordered columns={columns} {...tableProps} />
      </div>
    </div>
  )
}

export default OrderList
