import { Modal, Form, Input, Upload, Select } from 'antd'

const CreateUser = () => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
  }

  const handleCancel = () => {}

  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label='用户名'
          name='userName'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[{ required: true, message: '用户邮箱不能为空' }]}
        >
          <Input placeholder='请输入用户邮箱' />
        </Form.Item>
        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '部门不能为空' }]}>
          <Input type='number' placeholder='请输入部门' />
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='系统角色' name='role'>
          <Input placeholder='请输入角色' />
        </Form.Item>
        <Form.Item label='用户头像' name='userImg'></Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
