import { Button, Table, Form, Input, Space } from 'antd'
import { useAntdTable } from 'ahooks'
import dayjs from 'dayjs'
import { getRoleListAPI } from '@/api/roleApi'
import { Role } from '@/types/api'
import CreateRole from './CreateRole'
import { useRef } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'

const RoleList = () => {
  const [form] = Form.useForm()
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()

  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Role.Params
  ) => {
    return getRoleListAPI({
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

  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text'>设置权限</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //创建角色
  const handleCreate = () => {
    roleRef.current?.open('create')
  }

  //编辑角色
  const handleEdit = (data: Role.RoleItem) => {
    roleRef.current?.open('edit', data)
  }

  return (
    <div className='role-wrap'>
      <Form form={form} className='search-form' layout='inline'>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table rowKey='_id' bordered columns={columns} {...tableProps} />
      </div>
      <CreateRole mRef={roleRef} update={search.submit} />
    </div>
  )
}

export default RoleList
