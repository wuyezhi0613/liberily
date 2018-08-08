import * as React from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
interface IProps {
  test?: any
}

interface IState {
  content?: string // 输入内容
}

class Echarts extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      content: ''
    }
    this.getOption = this.getOption.bind(this)
  }

  getOption () {
    return {
      title: {
        text: 'ECharts 入门示例1'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  componentDidMount () {
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例2'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    const myChart = echarts.init(document.getElementById('echartsShow'))
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
  render() {
    return (
      <div>
        <ReactEcharts option={this.getOption()} style={{width: '100%'}}/>
        <div id='echartsShow' style={{ width: '100%', height: '300px' }} />
      </div>
    )
  }
}

export default Echarts