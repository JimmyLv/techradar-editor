// require('normalize.css/normalize.css')
import './App.css'

import React from 'react'
import Radar from './svg/Radar'
import ListComponent from './Radar/RadarList'

const UUID = require('uuid-js')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 'create', radius: 300, arr: []
    }
    this.screen2Cartesian = this.screen2Cartesian.bind(this)
  }

  didChangedPoints(points) {
    this.setState({
      page: 'create', margin: 60, radius: 250, arr: points
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
    let items = this.state.arr
      .map((point) => ({...point, index: this.state.arr.indexOf(point) + 1}))


    let items1st = items
      .filter((item) => item.x > 0 && item.y > 0)
      .map((point) => this.cartesian2Screen(point))

    let items2nd = items.filter((item) => {
      return item.x < 0 && item.y > 0
    }).map(this.cartesian2Screen.bind(this))
    let items3rd = items.filter((item) => {
      return item.x < 0 && item.y < 0
    }).map(this.cartesian2Screen.bind(this))
    let items4th = items.filter((item) => {
      return item.x > 0 && item.y < 0
    }).map(this.cartesian2Screen.bind(this))
    let points = this.state.arr
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ListComponent title="Techniques" items={items2nd} key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <ListComponent title="Tools" items={items1st} key={`${UUID.create().toString()}`}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Radar radius={this.state.radius}
                   points={points} didChangedPoints={this.didChangedPoints.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ListComponent title="Platforms" items={items3rd} key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <ListComponent title="Languages & Frameworks" items={items4th} key={`${UUID.create().toString()}`}/>
          </div>
        </div>
      </div>
    )
  }
}

App.defaultProps = {}

export default App
