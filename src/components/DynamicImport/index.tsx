import React, {Component} from 'react'

interface IProps {
  load: () => Promise<any>,
  children: (com: React.Component) => React.ReactNode
}
interface IState {
  component: React.Component| null
}
class DynamicImport extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      component: null
    }
  }
  componentDidMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component
        }))
      })
  }
  render() {
    if (this.state.component) {
      return this.props.children(this.state.component)
    } else {
      return <div>no component</div>
    }
    
  }
}

export default DynamicImport