import { Menu, Role } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Modal, Form, Tree } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { message } from '@/utils/AntdGlobal'
import { getMenuListAPI } from '@/api/index'
import { updatePermissionAPI } from '@/api/roleApi'

const SetPermission = (props: IModalProp<Role.RoleItem>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.Permission>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await getMenuListAPI()
    setMenuList(data)
  }

  //暴露组件的方法
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }

  //提交
  const handleOk = async () => {
    if (permission) {
      await updatePermissionAPI(permission)
      message.success('权限设置成功')
      handleCancel()
      props.update()
    }
  }

  //取消
  const handleCancel = () => {
    setVisible(false)
    setPermission(undefined)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)
    const checkedKeys: string[] = []
    const parentKeys: string[] = []
    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限'
      width={600}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item name='roleName'>{roleInfo?.roleName}</Form.Item>
        <Form.Item name='remark' label='权限'>
          <Tree
            defaultExpandAll
            fieldNames={{ title: 'menuName', key: '_id', children: 'children' }}
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SetPermission
