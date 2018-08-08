import * as React from 'react'
import {Button, Input} from 'antd'
import '../index.scss'
interface IProps {
  test?: any
  input?: (content?: any) => void
}
export interface Item {
  id: string,
  checked: boolean,
  content: string
}
interface IState {
  item: Item
}
class AddItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      item: {
        id: '',
        checked: false,
        content: ''
      }
    }
    this.getValue = this.getValue.bind(this)
    this.saveNewItem = this.saveNewItem.bind(this)
  }
  saveNewItem() {
    if (this.props.input) {
      this.props.input(this.state.item)
    }
  }  

  getValue(e) {
    if (e.target.value) {
      const array = e.target.value.split(',')
      const myChecked = array[1] === 'true' ? true : false
      this.setState({
        item: {
          id: array[0],
          checked: myChecked,
          content: array[2]
        }
      })
    }
  }

  render() {
    return(
      <div className='example-input'>
          <Input id='newItem' placeholder='Basic usage' onChange={this.getValue}/>
          <Button type='primary' className='pull-right' onClick={this.saveNewItem}>添加</Button>
      </div>
    )
  }
}

export default AddItem
