import * as React from 'react'
import Ajax from '../../utils/Ajax'


interface IProps {
  test?: any
}

interface IState {
  userInfo?: any,
  ganks?: any
}

export default class AjaxTest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userInfo: {
        name: 'anonymous'
      }
    }
  }
  componentDidMount() {
    Ajax.get('/api/0.4/?randomapi', {}).then((res: any) => {
      if (res!.results!.length > 0) {
        this.setState({
          userInfo: res.results[length - 1].user
        })
      }
    })
    Ajax.get('/gank/xiandu/category/wow', {}).then((res: any) => {
      console.log(res)
      if (res!.results!.length > 0) {
        this.setState({
          ganks: res.results
        })
      }
    })
  }


  render() {
    let userName = ''
    const userInfoName = this.state.userInfo.name
    if (userInfoName.first || userInfoName.last) {
      userName = `${userInfoName.first} ${userInfoName.last}` 
    } else {
      userName = userInfoName
    }
    return (
      <div>
        {userName ? `hello: ${userName}` : false}
        <div>
        {
          this.state.ganks && this.state.ganks.map(item => {
            return <img key={item._id} src={item.name} title={item.title} width={'100px'} height={'100px'} />
          })
        }
        </div>
      </div>
    )
  }
}
