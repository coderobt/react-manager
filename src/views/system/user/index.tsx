import { User, PageParams } from '@/types/api'
import { Button, Table, Form, Input, Select, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import { getUserList } from '@/api'
import dayjs from 'dayjs'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'

export default function UserList() {
  const [data, setData] = useState<User.UserItem[]>([])
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const userRef = useRef<{ open: (type: IAction, data?: User.UserItem) => void | undefined }>()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  useEffect(() => {
    getUserListData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  //获取用户列表
  const getUserListData = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const data = await getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    // const list = Array.from({ length: 50 })
    //   .fill({})
    //   .map((item: any) => {
    //     item = { ...data.list[0] }
    //     item.userId = Math.random()
    //     return item
    //   })
    setData(data.list)
    setTotal(data.list.length)
    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize
    })
  }

  //创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  //编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'address',
      render(record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //搜索
  const handleSearch = () => {
    const values = form.getFieldsValue()
    getUserList({
      ...values,
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  //重置表单
  const handleReset = () => {
    form.resetFields()
  }

  return (
    <div className='user-list'>
      <Form form={form} className='search-form' layout='inline' initialValues={{ state: 0 }}>
        <Form.Item label='用户ID' name='userName'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userId'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select style={{ width: '120px' }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜素
            </Button>
            <Button type='primary' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          rowSelection={{ type: 'checkbox' }}
          bordered
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            defaultCurrent: 1,
            total: total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `共${total}条`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() =>
          getUserListData({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }
      />
    </div>
  )
}
