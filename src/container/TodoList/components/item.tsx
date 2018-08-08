import * as React from 'react'
import {Button, Checkbox} from 'antd'
import '../index.scss'
interface IState {
  test?: any
}

interface IProps {
  inputItem?: any
  delete?: (key: string) => void
} 


class TodoItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    if (this.props.delete) {
      this.props.delete(this.props.inputItem.id)
    }
  }
  render() {
    return (
      <div className = 'showList'>
        <Checkbox checked={this.props.inputItem.checked} className = 'checkBox'/>{this.props.inputItem.content}
        <Button size='small' type='danger' onClick={this.delete}>删除</Button>
      </div>
        
    )
  }
}

export default TodoItem
