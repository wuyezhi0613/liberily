import * as React from 'react'
import { Button } from 'antd'

interface  IState {
  receivedMessage?: string, // 收到的消息
  sendMessage?: string // 要发送的消息
}

export interface IProps {
  message?: string, // 传递进来的消息
  onSay?: (content?: string) => void
}

export default class Summit extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      receivedMessage: this.props.message ? this.props.message : '',
      sendMessage: ''
    }
    this.getValue = this.getValue.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  // c#中方法默认私有，ts中方法默认公共
  getValue(evt: any) {
    if (evt.target.value) {
      this.setState({
        sendMessage: evt.target.value
      }, () => {
        console.log(this.state.sendMessage)
      })
    }
  }
  private sendMessage () {
    if (this.props.onSay) {
      this.props.onSay(this.state.sendMessage)
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps !== this.props.message) {
      this.setState({
        receivedMessage: nextProps.message
      })
    }
  }
  render() {
    const receiveMessage = this.state.receivedMessage
    return (
      <div>
        <div>收到消息：{receiveMessage}</div>
        <input type='text' onChange= {this.getValue}/>
        <Button onClick={this.sendMessage}>发送</Button>
      </div>
    )
  }
  
  
  
}