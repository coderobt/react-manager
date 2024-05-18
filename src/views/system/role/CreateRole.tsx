import { Role } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Modal, Form, Input } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { createRoleAPI, editRoleAPI } from '@/api/roleApi'
import { message } from '@/utils/AntdGlobal'

const { TextArea } = Input

const CreateRole = (props: IModalProp<Role.RoleItem>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  //暴露组件的方法
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  //提交
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = form.getFieldsValue()
      if (action === 'create') {
        await createRoleAPI(params)
      } else {
        await editRoleAPI(params)
      }
      message.success('操作成功')
      handleCancel()
      //更新弹框
      props.update()
    }
  }

  //取消
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='角色名称'
          name='roleName'
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRole
