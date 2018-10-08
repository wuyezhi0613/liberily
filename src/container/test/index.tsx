import React from 'react'
import Ajax from '../../utils/Ajax'
import { Button, Table, Modal, message } from 'antd'
import ModifyBooks from '../test/modifyBooks'
import AddBooks from '../test/addBooks'
import './index.scss'


const columns = [
    {
        title: '书名',
        dataIndex: 'name',
    },
    {
        title: '作者',
        dataIndex: 'author',
    },
    {
        title: '标签',
        dataIndex: 'labels',
    },
    {
        title: '简介',
        dataIndex: 'content',
    }
]
interface IProps {
    test?: any
    sendChangeData?: (content?: {}) => void
}

interface IState {
    test?: any
    isChangePage?: boolean
    data?: any
    isAdd?: boolean
    bookId?: string
    bookData?: any
    status?: any,
    selectedRowKeys?: any[],
    selectedRows?: any[]
}

export default class Books extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        this.state = {
            isChangePage: false,
            data: [],
            isAdd: true,
            status: '',
            selectedRowKeys: [],
            selectedRows: [],
        }

    }
    addBook = (e) => {
        e.preventDefault()
        this.modifyBook()
        this.setState({
            isAdd: true,
        })
    }

    editBook = (e) => {
        e.preventDefault()

        const bookInfo: any = this.state.selectedRows
        if (bookInfo.length === 1) {
            this.modifyBook()
            this.setState({
                isAdd: false,
            })
            if (this.props.sendChangeData) {
                this.props.sendChangeData(bookInfo[0])
            }
        } else {
            const msg = bookInfo.length === 0 ? '请选择一本书' : '每次只能编辑一本书'
            message.warn(msg)
        }
    }

    modifyBook = () => {
        this.setState({
            isChangePage: !this.state.isChangePage,
        })

        if (!this.state.isChangePage) {
            this.getBook()
        }
    }

    handleTableChange = (filters, sorter) => {
        this.getBook({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        })

    }

    getBook = (params = {}) => {
        Ajax.get('/books', {}).then((res: any) => {
            if (res!.data!.length > 0) {
              this.setState({
                data: res.data
              })
            }
          })
    }

    deleteBook = () => {
        const self = this
        const confirm = Modal.confirm
        const bookIds: any = self.state.selectedRowKeys
        if (bookIds.length === 1) {
            confirm({
                title: '提示',
                content: '确定要删除该记录？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    self.deleteBookFn(bookIds[0])
                },
                onCancel() {
                    console.log('Cancel')
                },
            })
        } else {
            const msg = bookIds.length === 0 ? '请选择一本书' : '每次只能删除一本书'
            message.warn(msg)
        }

    }

    deleteBookFn = (bookId) => {
        Ajax.get('/books/' + bookId + '/delete', {}).then((res: any) => {
            if (res) {
                message.success('删除成功', 3)
                this.getBook()
            }
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows })
    }
    render() {
        const { selectedRowKeys } = this.state

        const rowSelection = {
            loading: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                id: record.id,
            }),
        }
        const bookManager = (
            <div>
                <div>
                    <Button className='user-btn' style={{ marginLeft: '0px' }} type='primary'
                        onClick={this.addBook}>新增</Button>
                    <Button className='user-btn' type='primary' onClick={this.editBook}>修改</Button>
                    <Button className='user-btn' type='danger' onClick={this.deleteBook}>删除</Button>
                </div>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    onChange={this.handleTableChange}
                />
            </div>
        )

        const { isChangePage, isAdd, selectedRows } = this.state
        return (
            <div className='user-manager'>
                {
                    isChangePage ? (isAdd ? (<AddBooks changePage={this.modifyBook} />) : (
                        <ModifyBooks changePage={this.modifyBook}
                            bookData={selectedRows} />)) : bookManager
                }
            </div>
        )
    }
}
