import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Index from './routers'
import './index.scss'


ReactDOM.render(
  <Index />,
  document.getElementById('root') as HTMLElement
)

declare var module: any
if (module.hot) {
  module.hot.accept()
}
