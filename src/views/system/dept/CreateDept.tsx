import { Dept, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Modal, Form, TreeSelect, Input, Select } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { getDeptListAPI, getAllUserListAPI, createDeptAPI, editDeptAPI } from '@/api/index'
import { message } from '@/utils/AntdGlobal'

const CreateDept = (props: IModalProp<Dept.EditParams>) => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [userList, setUserList] = useState<User.UserItem[]>([])

  useEffect(() => {
    getAllUserList()
  }, [])

  const getDeptList = async () => {
    const data = await getDeptListAPI()
    setDeptList(data)
  }

  const getAllUserList = async () => {
    const data = await getAllUserListAPI()
    setUserList(data)
  }

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  //打开弹框函数
  const open = (type: IAction, data?: Dept.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getDeptList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  //部门提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await createDeptAPI(form.getFieldsValue())
      } else {
        await editDeptAPI(form.getFieldsValue())
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    } else {
      message.error('请填写完整表单信息')
    }
  }

  //关闭和重置弹框
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            fieldNames={{ label: 'deptName', value: '_id' }}
            allowClear
            treeDefaultExpandAll
            placeholder='请选择上级部门'
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item
          label='部门名称'
          name='deptName'
          rules={[{ required: true, message: '部门不能为空' }]}
        >
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item
          label='负责人'
          name='userName'
          rules={[{ required: true, message: '负责人不能为空' }]}
        >
          <Select>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
