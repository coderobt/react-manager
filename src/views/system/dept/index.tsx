import '@/App.less'
import { Form, Input, Button, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { getDeptListAPI } from '@/api/index'
import { Dept } from '@/types/api'

const DeptList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])

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

  const columns = [
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
      key: 'updateTime'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text'>编辑</Button>
            <Button type='text'>删除</Button>
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
            <Button type='primary'>新增</Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  )
}

export default DeptList
