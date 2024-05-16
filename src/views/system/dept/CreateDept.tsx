import { Dept } from '@/types/api'
import { IAction } from '@/types/modal'
import { Modal, Form, TreeSelect, Input, Select } from 'antd'
import { useState } from 'react'

const CreateDept = () => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])

  const handleSubmit = () => {}
  const handleCancel = () => {}

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={true}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            fieldNames={{ label: 'deptName', value: '_id' }}
            allowClear
            treeDefaultExpandAll
            placeholder='请选择上级部门'
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName'>
          <Select>
            <Select.Option value='jack' key={'jack'}>
              Jack
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
