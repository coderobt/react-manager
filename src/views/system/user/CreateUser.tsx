import { Modal, Form, Input, Upload, Select, Space, TreeSelect } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useImperativeHandle, useState } from 'react'
import storage from '@/utils/storage'
import { RcFile, UploadProps } from 'antd/es/upload'
import { message } from '@/utils/AntdGlobal'
import { IModalProp, IAction } from '@/types/modal'
import { Dept, Role, User } from '@/types/api'
import { createUserAPI, editUserAPI, getDeptListAPI } from '@/api/index'
import { getAllRoleListAPI } from '@/api/roleApi'

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [loading, setLoading] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])

  useEffect(() => {
    getDeptList()
    getRoleList()
  }, [])

  //获取部门列表
  const getDeptList = async () => {
    const data = await getDeptListAPI()
    setDeptList(data)
  }

  //获取角色列表
  const getRoleList = async () => {
    const data = await getAllRoleListAPI()
    setRoleList(data)
  }

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
    if (action === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }
      if (action === 'create') {
        await createUserAPI(params)
        message.success('创建成功')
      } else {
        await editUserAPI(params)
        message.success('修改成功')
      }
      handleCancel()
      props.update()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
    setImg('')
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
      title={action === 'create' ? '创建用户' : '编辑用户'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='用户名'
          name='userName'
          rules={[
            { required: true, message: '用户名不能为空' },
            { min: 5, max: 12, message: '用户名长度为5-12位' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[
            { required: true, message: '用户邮箱不能为空' },
            { pattern: /^\w+@mars.com$/, message: '邮箱必须以@mars.com结尾' },
            { type: 'email', message: '请输入正确的邮箱' }
          ]}
        >
          <Input disabled={action === 'edit'} placeholder='请输入用户邮箱' />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[
            { len: 11, message: '手机号必须为11位数字' },
            { pattern: /1[1-9]\d{9}/, message: '手机号必须为1开头的11位数字' }
          ]}
        >
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
          <TreeSelect
            placeholder='请选择部门'
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            allowClear
            treeDefaultExpandAll
            treeData={deptList}
            fieldNames={{ label: 'deptName', value: '_id' }}
          />
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
        <Form.Item label='系统角色' name='roleList'>
          <Select>
            {roleList.map(item => {
              return (
                <Select.Option key={item._id} value={item._id}>
                  {item.roleName}
                </Select.Option>
              )
            })}
          </Select>
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
