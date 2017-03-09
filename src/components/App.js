// require('normalize.css/normalize.css')
import './App.css'

import React from 'react'
import firebase from 'firebase'
import { connect } from 'react-firebase'

import Radar from './svg/Radar'
import RadarList from './Radar/RadarList'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB9S8V2ZNyrJAxsZ7gMjCI-HkjTIMGYfoo',
  authDomain: 'tech-radar-editor.firebaseapp.com',
  databaseURL: 'https://tech-radar-editor.firebaseio.com',
  storageBucket: 'tech-radar-editor.appspot.com',
  messagingSenderId: '153565518091'
}
firebase.initializeApp(config)

const UUID = require('uuid-js')

class App extends React.Component {
  constructor(props) {
    super(props)
    let initialState = props.value || {}
    this.state = {
      page: 'create',
      radius: 300,
      points: initialState.points || []
    }
    this.screen2Cartesian = this.screen2Cartesian.bind(this)
    this.didChangedPoints = this.didChangedPoints.bind(this)
  }

  didChangedPoints(points) {
    this.setState({
      page: 'create',
      margin: 60,
      radius: 250,
      points: points
    })
    let items = points
      .map((point) => ({
        ...point,
        index: points.indexOf(point) + 1
      }))

    this.props.setValue({ points: items })
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
    const { points, radius } = this.state
    let items = points
      .map((point) => ({
        ...point,
        index: points.indexOf(point) + 1
      }))

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
              points={items2nd}
              allPoints={points}
              updatePoint={this.didChangedPoints}
              key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <RadarList
              title="Tools"
              updatePoint={this.didChangedPoints}
              allPoints={points}
              points={items
                .filter(({ x, y }) => x > 0 && y > 0)
                .map((point) => this.cartesian2Screen(point))}
              key={`${UUID.create().toString()}`}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Radar radius={radius}
                   points={points}
                   didChangedPoints={this.didChangedPoints}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <RadarList
              title="Platforms"
              points={items3rd}
              allPoints={points}
              updatePoint={this.didChangedPoints}
              key={`${UUID.create().toString()}`}/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <RadarList
              title="Languages & Frameworks"
              points={items4th}
              allPoints={points}
              updatePoint={this.didChangedPoints}
              key={`${UUID.create().toString()}`}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((props, ref) => ({
  value: 'tech-radar-state',
  setValue: value => ref('tech-radar-state').set(value)
}))(App)
