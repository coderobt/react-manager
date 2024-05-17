import '@/App.less'
import { Form, Input, Button, Space, Table, Modal, message, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { getMenuListAPI, delMenuAPI } from '@/api/index'
import { Menu } from '@/types/api'
import CreateMenu from './CreateMenu'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const MenuList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])

  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const values = form.getFieldsValue()
    const data = await getMenuListAPI(values)
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleCreate = () => {
    menuRef.current?.open('create', {
      orderBy: data.length
    })
  }

  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length })
  }

  //删除菜单
  const handleDel = (record: Menu.MenuItem) => {
    let text = {
      1: '菜单',
      2: '按钮',
      3: '页面'
    }[record.menuType]
    Modal.confirm({
      title: '确定要删除嘛?',
      content: `确认删除该${text}嘛?`,
      onOk() {
        handleDelSubmit(record._id)
      }
    })
  }

  //删除提交
  const handleDelSubmit = async (id: string) => {
    await delMenuAPI({ _id: id })
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(record) {
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
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Form initialValues={{ menuState: 1 }} form={form} layout='inline' className='search-form'>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={getMenuList}>
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
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}

export default MenuList
