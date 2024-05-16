import '@/App.less'
import { Form, Input, Button, Space, Table, Modal, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { getDeptListAPI, deleteDeptAPI } from '@/api/index'
import { Dept } from '@/types/api'
import CreateDept from './CreateDept'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const DeptList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])

  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, [])

  const getDeptList = async () => {
    const values = form.getFieldsValue()
    const data = await getDeptListAPI(values)
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  const handleDel = (id: string) => {
    Modal.confirm({
      title: '确定要删除嘛?',
      content: '确认删除该部门嘛?',
      onOk() {
        handleDelSubmit(id)
      }
    })
  }

  //删除提交
  const handleDelSubmit = async (id: string) => {
    await deleteDeptAPI({ _id: id })
    message.success('删除成功')
    getDeptList()
  }

  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 100
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(_, record) {
        return dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(_, record) {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDel(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Form form={form} layout='inline' className='search-form'>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={getDeptList}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}

export default DeptList
