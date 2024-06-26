import { User } from '@/types/api'
import { Button, Table, Form, Input, Select, Space, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRef, useState } from 'react'
import { delUserAPI, getUserList } from '@/api'
import dayjs from 'dayjs'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton/AuthButton'

export default function UserList() {
  // const [data, setData] = useState<User.UserItem[]>([])
  const [form] = Form.useForm()
  // const [total, setTotal] = useState(0)
  const [userIds, setUserIds] = useState<number[]>([])
  const userRef = useRef<{ open: (type: IAction, data?: User.UserItem) => void }>()
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 10
  // })

  // useEffect(() => {
  //   getUserListData({
  //     pageNum: pagination.current,
  //     pageSize: pagination.pageSize
  //   })
  // }, [pagination.current, pagination.pageSize])

  //获取用户列表
  // const getUserListData = async (params: PageParams) => {
  //   const values = form.getFieldsValue()
  //   const data = await getUserList({
  //     ...values,
  //     pageNum: params.pageNum,
  //     pageSize: params.pageSize || pagination.pageSize
  //   })
  //   setData(data.list)
  //   setTotal(data.page.total)
  //   setPagination({
  //     current: data.page.pageNum,
  //     pageSize: data.page.pageSize
  //   })
  // }

  //创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  //编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  //删除用户单个
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户嘛?</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  //批量删除确认
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除批用户嘛?</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  //公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    await delUserAPI({ userIds: ids })
    message.success('删除成功')
    setUserIds([])
    search.reset()
    // getUserListData({
    //   pageNum: 1,
    //   pageSize: pagination.pageSize
    // })
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
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //搜索
  // const handleSearch = () => {
  // const values = form.getFieldsValue()
  // search.submit()
  // getUserListData({
  //   ...values,
  //   pageNum: 1,
  //   pageSize: pagination.pageSize
  // })
  // }

  //重置表单
  // const handleReset = () => {
  // form.resetFields()
  // search.reset()
  // }

  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: User.Params
  ) => {
    return getUserList({
      ...formData,
      pageNum: current,
      pageSize: pageSize
    }).then(data => {
      return {
        total: data.page.total,
        list: data.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

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
            <Button type='primary' onClick={search.submit}>
              搜素
            </Button>
            <Button type='primary' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton auth='user@create' type='primary' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button onClick={handlePatchConfirm} type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          bordered
          // dataSource={data}
          columns={columns}
          // pagination={{
          //   position: ['bottomRight'],
          //   current: pagination.current,
          //   pageSize: pagination.pageSize,
          //   defaultCurrent: 1,
          //   total: total,
          //   showQuickJumper: true,
          //   showSizeChanger: true,
          //   showTotal: function (total) {
          //     return `共${total}条`
          //   },
          //   onChange: (page, pageSize) => {
          //     setPagination({
          //       current: page,
          //       pageSize
          //     })
          //   }
          // }}
          {...tableProps}
        />
      </div>
      <CreateUser mRef={userRef} update={() => search.reset()} />
    </div>
  )
}
