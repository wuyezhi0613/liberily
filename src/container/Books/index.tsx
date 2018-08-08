import React from 'react'
import Ajax from '../../utils/Ajax'
import PubSub from 'pubsub-js'
import { Button, Input } from 'antd'
import Item, { DELSTR, DETSTR } from './item'
import './index.scss'

interface IProps {
  test?: any
}

interface IState {
  resData?: any
  detail?: any
  books?: any
  booksData?: any
  addFlag?: any
}

class Books extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      resData: [],
      detail: 'none',
      books: 'block',
      booksData: [],
      addFlag: 'none'
    }
    this.allBooksFn = this.allBooksFn.bind(this)
    this.lastFn = this.lastFn.bind(this)
    this.addBooksFn = this.addBooksFn.bind(this)
    this.saveFn = this.saveFn.bind(this)
  }
  componentWillMount() {
    this.allBooksFn()
  }
  componentDidMount() {
    PubSub.subscribe(DELSTR, (msg, data) => {
      Ajax.get('/books/' + data + '/delete', {}).then((res: any) => {
        if (res!) {
          this.allBooksFn()
        }
      })
    })
    PubSub.subscribe(DETSTR, (msg, data) => {
      this.setState({
        detail: 'block',
        books: 'none'
      })
      Ajax.get('/books/' + data, {}).then((res: any) => {
        if (res!.data!.length > 0) {
          this.setState({
            booksData: res.data[0]
          })
        }
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(DELSTR, DETSTR)
  }
  allBooksFn() {
    Ajax.get('/books', {}).then((res: any) => {
      if (res!.data!.length > 0) {
        this.setState({
          resData: res.data
        })
      }
    })
  }
  addBooksFn() {
    this.setState({
      addFlag: 'block'
    })
  }
  lastFn() {
    this.setState({
      detail: 'none',
      books: 'block'
    })
  }
  saveFn() {
    const dom = document.getElementById('addbooksForm')
    const inputs = dom!.getElementsByTagName('input')
    const len = inputs.length
    let param = ''
    let str = ''
    for (let i = 0; i < len; i++) {
      param += inputs[i].value + '&'
    }
    if (param !== '') {
      const arr = param.split('&')
      str += 'name=' + arr[0] + '&'
      str += 'author=' + arr[1] + '&'
      str += 'labels=' + arr[2] + '&'
      str += 'content=' + arr[3]
    }
    Ajax.get('/books/add?' + str, {}).then((res: any) => {
      if (res!) {
        alert('添加成功')
      }
    }).then(() => {
      this.setState({
        addFlag: 'none'
      })
      this.allBooksFn()
    })
  }
  render() {
    return (
      <div className='booksBox'>
        <div style={{ display: this.state.books }}>
          <Button type='primary' onClick={this.addBooksFn} style={{ margin: '20px 0 0 40px' }}>添加</Button>
          <div className='itemBooks'>
            <ul>
              <li className='itemTit'>
                <span>书名</span>
                <span>作者</span>
                <span style={{width: '50px'}}>操作</span>
              </li>
            </ul>
            {this.state.resData.map((item, index) => {
              return (
                <div key={index}>
                  <Item itemList={item}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className= 'addbooksItem' style={{display: this.state.addFlag }}>
          <form id='addbooksForm'>
            <div className='addInfo'> 
              <div>
                <span>书名</span><Input name='name'/>
              </div>
              <div>
                <span>作者</span><Input name='author'/>
              </div>
              <div>
                <span>标签</span><Input name='labels'/>
              </div>
              <div>
                <span>简介</span><Input name='content' />
              </div>
              <Button type='primary' onClick={this.saveFn}>确定</Button>
            </div>
          </form>
        </div>
        <div className= 'booksInfo'style={{ display: this.state.detail }}>
          <Button type='primary' onClick={this.lastFn}>返回</Button>
          <div>
            <div>书名: {this.state.booksData.name}</div>
            <div>作者: {this.state.booksData.author}</div>
            <div>标签: {this.state.booksData.labels}</div>
            <div>简介: {this.state.booksData.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Books