import * as React from 'react'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'
import config from './config'
import './index.scss'
interface IState {
  mapOptions?: object // maptalks的初始化配置信息
  mapStyle?: CSSStyleDeclaration
}
interface IProps {
  mapOptions?: object // maptalks的初始化配置信息
  mapStyle?: React.CSSProperties,
  isArcGISLayer?: boolean,
  onCreate?: (maptalksMap: any) => void
}

export default class MaptalksCom extends React.Component<IProps, IState> {
  map: any
  mapContainer: HTMLDivElement| null

  constructor(props: IProps, state: IState) {
    super(props)
    // 地图默认配置
    const mapOptions = config.mapOptions
    const mapDefaultOptions: any = {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: mapOptions.baseLayer.urlTemplate,
        subdomains: mapOptions.baseLayer.subdomains,
        attribution: mapOptions.baseLayer.attribution
      })
    }
    // 地图默认样式
    const mapDefaultStyle: any = {
      height: '500px', width: '100%'
    }
    this.state = {
      mapOptions: Object.assign({}, ...mapDefaultOptions, this.props.mapOptions),
      mapStyle: Object.assign({}, ...mapDefaultStyle, this.props.mapStyle)
    }

  }
  componentDidMount() {
    this.constructMap(this.mapContainer).then(map => {
      this.map = map
    }, (errInfo) => {
      console.error(errInfo)
    })
    .then(() => {
      if (this.props.onCreate) {
        this.props.onCreate(this.map)
      }
    })
  }
  refs: {
    [key: string]: any
  }
  render() {
    const style = this.state.mapStyle ? this.state.mapStyle : {}
    return <div style={style}>
      <div ref={node => this.mapContainer = node} className='maptalksCom' />
    </div>
  }
  /**
   * 创建地图
   *
   * @param {(HTMLDivElement| null)} mapContainer 地图容器
   * @returns Promise
   * @memberof MaptalksCom
   */
  constructMap(mapContainer: HTMLDivElement| null) {
    return new Promise((resolve, reject) => {
      if (mapContainer) {
        if (this.props.isArcGISLayer) {
          const arcUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          maptalks.SpatialReference.loadArcgis(arcUrl + '?f=pjson', (err, conf) => {
            if (err) {
              throw new Error(err)
            }
            resolve(new maptalks.Map(mapContainer, {
              center: config.mapOptions.center,
              zoom: config.mapOptions.zoom,
              maxZoom: 20,
              minZoom: 4,
              spatialReference: {
                projection: 'EPSG:4326'
              },
              baseLayer: new maptalks.TileLayer('base', {
                spatialReference: {
                  projection: 'EPSG:3857'
                },
                'urlTemplate': arcUrl + '/tile/{z}/{y}/{x}',
                'attribution': '&copy; <a target="_blank" href="' + arcUrl + '"">ArcGIS</a>'
              })
            }))
          })
        } else {
          resolve(new maptalks.Map(this.mapContainer, this.state.mapOptions))
        }
      } else {
        reject('Invalid map container div')
      }
    })
  }
}