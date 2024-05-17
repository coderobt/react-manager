import { Menu } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Modal, Form, TreeSelect, Input, InputNumber, Radio } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { getMenuListAPI, createMenuAPI, editMenuAPI } from '@/api/index'
import { message } from '@/utils/AntdGlobal'
import { InfoCircleOutlined } from '@ant-design/icons'

const CreateMenu = (props: IModalProp<Menu.EditParams>) => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  const getMenuList = async () => {
    const data = await getMenuListAPI()
    setMenuList(data)
  }

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  //打开弹框函数
  const open = (type: IAction, data?: Menu.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getMenuList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  //菜单提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await createMenuAPI(form.getFieldsValue())
      } else {
        await editMenuAPI(form.getFieldsValue())
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        initialValues={{ menuType: 1, menuState: 1 }}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            fieldNames={{ label: 'menuName', value: '_id' }}
            allowClear
            treeDefaultExpandAll
            placeholder='请选择父级菜单'
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='菜单名称'
          name='menuName'
          rules={[{ required: true, message: '菜单名称不能为空' }]}
        >
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item
          label='排序'
          name='orderBy'
          tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}
        >
          <InputNumber placeholder='请输入排序值' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
