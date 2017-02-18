// require('normalize.css/normalize.css')
import './App.css'

import React from 'react'
import Radar from './svg/Radar'
import RadarList from './Radar/RadarList'

const UUID = require('uuid-js')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 'create', radius: 300, points: []
    }
    this.screen2Cartesian = this.screen2Cartesian.bind(this)
  }

  didChangedPoints(points) {
    this.setState({
      page: 'create', margin: 60, radius: 250, points: points
    })
  }

  cartesian2Screen(point) {
    return {
      x: (1 + point.x) * this.state.radius,
      y: (1 - point.y) * this.state.radius,
      type: point.type,
      id: point.id,
      name: point.name,
      index: point.index
    }
  }

  screen2Cartesian(point) {
    return {
      x: point.x / this.state.radius - 1,
      y: 1 - point.y / this.state.radius,
      type: point.type,
      id: point.id,
      name: point.name,
      index: point.index
    }
  }

  render() {
    const {points, radius} = this.state
    let items = points
      .map((point) => ({...point, index: points.indexOf(point) + 1}))

    let items2nd = items.filter((item) => {
      return item.x < 0 && item.y > 0
    }).map(this.cartesian2Screen.bind(this))
    let items3rd = items.filter((item) => {
      return item.x < 0 && item.y < 0
    }).map(this.cartesian2Screen.bind(this))
    let items4th = items.filter((item) => {
      return item.x > 0 && item.y < 0
    }).map(this.cartesian2Screen.bind(this))

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <RadarList
              title="Techniques"
              items={items2nd}
              key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <RadarList
              title="Tools"
              items={items
                .filter(({x, y}) => x > 0 && y > 0)
                .map((point) => this.cartesian2Screen(point))}
              key={`${UUID.create().toString()}`}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Radar radius={radius}
                   points={points}
                   didChangedPoints={this.didChangedPoints.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <RadarList
              title="Platforms"
              items={items3rd}
              key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <RadarList
              title="Languages & Frameworks"
              items={items4th}
              key={`${UUID.create().toString()}`}/>
          </div>
        </div>
      </div>
    )
  }
}

App.defaultProps = {}

export default App
