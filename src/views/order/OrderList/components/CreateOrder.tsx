import { IModalProp } from '@/types/modal'
import { Modal, Form, Row, Col, Select, Input, DatePicker } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { getCityListAPI, getVehicleListAPI, createOrderAPI } from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

const CreateOrder = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [cityList, setCityList] = useState<Order.DictItem[]>([])
  const [vehicleList, setVehicleList] = useState<Order.DictItem[]>([])

  useEffect(() => {
    getCityList()
    getVehicleList()
  }, [])

  //初始化城市列表
  const getCityList = async () => {
    const data = await getCityListAPI()
    setCityList(data)
  }

  //初始化车型列表
  const getVehicleList = async () => {
    const data = await getVehicleListAPI()
    setVehicleList(data)
  }

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  //打开弹框
  const open = () => {
    setVisible(true)
  }

  //创建订单提交
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      await createOrderAPI(form.getFieldsValue())
      message.success('创建订单成功')
      handleCancel()
      props.update()
    }
  }

  //弹框关闭
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title='创建订单'
      width={800}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
      open={visible}
    >
      <Form
        form={form}
        layout='horizontal'
        labelAlign='right'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label='城市名称'
              name='cityName'
              rules={[{ required: true, message: '请输入城市名称' }]}
            >
              <Select placeholder='请选择城市名称'>
                {cityList.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  )
                })}
                <Select.Option value='1'>北京</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='车型名称'
              name='vehicleName'
              rules={[{ required: true, message: '请输入车型' }]}
            >
              <Select placeholder='请选择车型名称'>
                {vehicleList.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label='用户名称'
              name='userName'
              rules={[{ required: true, message: '请输入用户名称' }]}
            >
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='手机号' name='mobile'>
              <Input placeholder='请输入下单手机号' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='起始地址' name='startAddress'>
              <Input placeholder='请输入起始地址' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束地址' name='endAddress'>
              <Input placeholder='请输入结束地址' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label='下单金额'
              name='orderAmount'
              rules={[{ required: true, message: '请输入下单金额' }]}
            >
              <Input type='number' placeholder='请输入下单金额' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='支付金额'
              name='userPayAmount'
              rules={[{ required: true, message: '请输入支付金额' }]}
            >
              <Input type='number' placeholder='请输入支付金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label='司机名称'
              name='driverName'
              rules={[{ required: true, message: '请输入司机名称' }]}
            >
              <Input placeholder='请输入司机名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='司机金额'
              name='driverAmount'
              rules={[{ required: true, message: '请输入司机金额' }]}
            >
              <Input type='number' placeholder='请输入司机金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='payType' label='支付方式'>
              <Select placeholder='请选择支付方式'>
                <Select.Option value={1}>微信</Select.Option>
                <Select.Option value={2}>支付宝</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='state' label='订单状态'>
              <Select placeholder='请选择订单状态'>
                <Select.Option value={1}>进行中</Select.Option>
                <Select.Option value={2}>已完成</Select.Option>
                <Select.Option value={3}>超时</Select.Option>
                <Select.Option value={4}>取消</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='useTime' label='用车时间'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='endTime' label='结束时间'>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CreateOrder
