import React from 'react'
import PubSub from 'pubsub-js'
import {Button} from 'antd'
import './index.scss'


interface IProps {
  itemList?: any
}

interface IState {
  tes?: any
}

export const DETSTR = 'addbooks'
export const DELSTR = 'delbooks'

class Item extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      tes: ''
    }
    this.detailFn = this.detailFn.bind(this)
    this.deleteFn = this.deleteFn.bind(this)
  }
  detailFn() {
    PubSub.publish(DETSTR, this.props.itemList._id["$oid"])
  }
  deleteFn() {
    PubSub.publish(DELSTR, this.props.itemList._id["$oid"])
  }
  render() {
    return (
      <div>
        <div className='booksLists'>
          <ul>
            <li >
              <span onClick={this.detailFn}>{this.props.itemList.name}</span>
              <span>{this.props.itemList.author}</span>
              <Button type='danger' size='small' onClick={this.deleteFn}>删除</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Item