import React from 'react'
import {Button, Card, Form, Input, message} from 'antd'
import Ajax from '../../utils/Ajax'
const FormItem = Form.Item


export interface IProps {
    test?: any
    bookData?: any
    changePage?: any
}

interface IState {
    test?: any
    name?: string
    author?: string
    labels?: string
    content?: string
}

export default class ModifyBooks extends React.PureComponent<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)

        this.state = {
            name: this.props.bookData[0].name,
            author: this.props.bookData[0].url,
            labels: this.props.bookData[0].status,
            content: this.props.bookData[0].explains
        }
    }

    handleNameAdd = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleAuthorAdd = (e) => {
        this.setState({
            author: e.target.value,
        })
    }

    handleLabelsAdd = (e) => {
        this.setState({
            labels: e.target.value,
        })
    }

    handleContentAdd = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1
    }

    getBookInfo() {
        const name = this.props.bookData[0].name
            Ajax.get(`/books?name=${name}`, {}).then((res: any) => {
            const resData = res.data[0]
            if (resData) {
                this.setState({
                    name: resData.loginName,
                    author: resData.author,
                    labels: resData.phone,
                    content: resData.email
                })
            }

        })
    }
    changeBookFn = (e) => {
        e.preventDefault()

        const params = {
            id: this.props.bookData[0].id,
            name: this.state.name,
            author: this.state.author,
            labels: this.state.labels,
            content: this.state.content
        }


        Ajax.get('/books/' + params, {}).then((res: any) => {
            if (res) {
                message.success('添加成功', 3)
                this.props.changePage()
            }
        })
    }

    recoverFn = (e) => {
        e.preventDefault()
        this.setState({
            name: this.props.bookData[0].name,
            author: this.props.bookData[0].url,
            labels: this.props.bookData[0].status,
            content: this.props.bookData[0].explains
        })
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 7},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
                md: {span: 12},
            },
        }

        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
            },
        }

        return (
            <Card title='修改图书'
                  bordered={false}
            >
                <Form
                    hideRequiredMark
                >
                    <FormItem
                        {...formItemLayout}
                        label='书名'>
                        <Input className='input' name='name' value={this.state.name}
                               onChange={this.handleNameAdd}/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='作者'>
                        <Input className='input' name='author' value={this.state.author}
                               onChange={this.handleAuthorAdd}/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='标签'>
                        <Input className='input' name='labels' value={this.state.labels} onChange={this.handleLabelsAdd}/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='简介'>
                        <Input className='input' name='content' value={this.state.content} onChange={this.handleContentAdd}/>
                    </FormItem>

                    <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                        <Button type='primary' onClick={this.changeBookFn}>
                            提交
                        </Button>
                        <Button style={{marginLeft: 8}} onClick={this.recoverFn}>重置</Button>
                        <Button style={{marginLeft: 8}} onClick={this.props.changePage}>返回</Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}
