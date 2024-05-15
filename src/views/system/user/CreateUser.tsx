import { Modal, Form, Input, Upload, Select, Space } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useImperativeHandle, useState } from 'react'
import storage from '@/utils/storage'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { message } from '@/utils/AntdGlobal'
import { IModalProp, IAction } from '@/types/modal'
import { User } from '@/types/api'
import { createUserAPI } from '@/api/index'

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [loading, setLoading] = useState(false)

  //暴露子组件的open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }
      if (action === 'create') {
        const data = await createUserAPI(params)
        message.success('创建成功')
        handleCancel()
        props.update()
      }
    }
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  //上传之前接口处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式图片!')
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5
    if (!isLt500K) {
      message.error('图片不能超过500K!')
    }
    return isJpgOrPng && isLt500K
  }

  //上传后图片处理
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      const { code, data, msg } = info.file.response
      setLoading(false)
      if (code === 0) {
        setImg(data.file)
      } else {
        message.error(msg)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试')
    }
  }
  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
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
        <Form.Item label='部门' name='deptId'>
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
        <Form.Item label='用户头像'>
          <Upload
            headers={{
              Authorization: 'Bearer ' + storage.get('token'),
              icode: '118C2CD1952E3BCF'
            }}
            showUploadList={false}
            listType='picture-circle'
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} style={{ width: '100%', borderRadius: '100%' }} />
            ) : (
              <Space direction='vertical'>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div>上传头像</div>
              </Space>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
