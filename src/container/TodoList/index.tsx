import * as React from 'react'
import TodoItem from './components/item'
import AddItem, { Item as GZR } from './components/addItem'
import './index.scss'

interface IState {
  items: GZR[]
}
interface IProps {
  test: any
}
class TodoList extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      items: [
        {id: '1', content: '测试数据一', checked: false},
        {id: '2', content: '测试数据二', checked: true},
        {id: '3', content: '测试数据三', checked: false},
        {id: '4', content: '测试数据四', checked: true}
      ]
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }

  handleAdd(content: any) {
    const itemArray = this.state.items
    itemArray.push(content)
    this.setState({
      items: itemArray
    }, () => {
      console.log('父容器收到的值：')
      console.dir(content)
    })
  }

  handleDelete(key: any) {
    console.log('要删除的键为:' + key)
    const itemArray = this.state.items
    itemArray.map(item => {
      if (item.id === key) {
        const index = itemArray.indexOf(item)
        if (index > -1) {
          itemArray.splice(index, 1)
        }
      }
    })
    this.setState({
      items: itemArray
    })
  }

  render() {
    return(
      <div className = 'todoListBox'>
        <h1 style={{ textAlign: 'center' }}>TodoList</h1>
        {this.state.items.map(item => {
          const mycolor = item.checked ? '#A4D3ee' : '#ffffff'
          const colorStyle = {
            backgroundColor: mycolor
          }
          return (
            <div key={item.id} style={colorStyle}> 
              <TodoItem inputItem={item} delete={this.handleDelete} />
            </div>
          )
        })
        }
        <AddItem input={this.handleAdd} />
      </div>
    )
  }
}

export default TodoList