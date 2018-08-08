import * as React from 'react'
import { Input } from 'antd'
  
interface IProps {
  test?: any
}

interface IState {
  content?: string // 输入内容
}

class App1 extends React.Component<IProps, IState > {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      content : ''
    }
    this.handleInput = this.handleInput.bind(this)
  }
  handleInput (evt) {
    if (evt.target.value) {
      this.setState ({
        content: evt.target.value
      }, () => {
        alert('test')
      })
    }

  }
  // componentWillMount(){

  // }
  // componentDidMount (){

  // }
  // componentWillReceiveProps (nextProps: Iprops) {
  //   if (nextProps.test !== this.props.test) {

  //   }
  // }
  
  render () {
    return (
      <div>
        <Input onChange = {this.handleInput}/>
        <div>{this.state.content}</div>
      </div>
    )
  }
}

export default App1