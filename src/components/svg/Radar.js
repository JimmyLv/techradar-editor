'use strict'

import React from 'react'
import Triangle from './Triangle'
import Circle from './Circle'

import './Radar.scss'

const UUID = require('uuid-js')

class RadarComponent extends React.Component {
  constructor(props) {
    super()
    this.radius = props.radius
    this.didChangedPoints = props.didChangedPoints
    this.state = { points: props.points }
  }

  onCreateANewPoint(event) {
    let pointRadius = 0.05
    let points = this.state.points
    let point = {
      type: 'new',
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
      id: UUID.create().toString()
    }
    point = this.screen2Cartesian(point) // create from click event
    let pointSelected = points
      .filter(item => (
        (point.x >= item.x - pointRadius)
        &&
        (point.x <= item.x + pointRadius)
        &&
        (point.y >= item.y - pointRadius)
        &&
        (point.y <= item.y + pointRadius))
      )
    if (pointSelected.length > 0) {
      let pointToDelete = pointSelected[0]
      let index = points.indexOf(pointToDelete)
      let deletePoint = confirm(`delete ${pointToDelete.name} point?`)
      if (deletePoint) {
        points.splice(index, 1) // select to delete
      }
    } else {
      let enterName = prompt('Enter a value')
      if (enterName === null) {
        return
      }
      point.name = enterName
      let type = confirm('Is a new one?')
      point.type = type ? 'new' : 'old'
      points.push(point)
    }
    this.setState({ points: points })
    this.didChangedPoints(points)
  }

  getColorByPoint(point) {
    if (point.x > 0 && point.y > 0) {
      return '#BA68C8'
    } else if (point.x > 0 && point.y < 0) {
      return '#2196F3'
    } else if (point.x < 0 && point.y > 0) {
      return '#FF8A80'
    } else if (point.x < 0 && point.y < 0) {
      return '#009688'
    }
  }

  cartesian2Screen(point) {
    return {
      x: (1 + point.x) * this.radius,
      y: (1 - point.y) * this.radius,
      type: point.type,
      id: point.id,
      name: point.name,
      index: point.index
    }
  }

  screen2Cartesian(point) {
    return {
      x: point.x / this.radius - 1,
      y: 1 - point.y / this.radius,
      type: point.type,
      id: point.id,
      name: point.name,
      index: point.index
    }
  }

  render() {
    let radius = this.radius
    let length = radius * 2

    let accessR = radius * 0.8
    let trialR = radius * 0.6
    let adoptR = radius * 0.3

    let serviceTrackWidth = radius * 0.05
    let serviceTrackOrigin = radius - serviceTrackWidth * 0.5
    let labelFontSize = serviceTrackWidth * 0.8

    let pointRadius = radius * 0.05

    let holdTextX = radius * 0.1
    let assessTextX = radius * 0.3
    let trialTextX = radius * 0.55
    let adoptTextX = radius * 0.85

    return (
      <svg width={length} height={length} version='1.1'
           xmlns='http://www.w3.org/2000/svg' onClick={this.onCreateANewPoint.bind(this)}>
        <circle cx={radius} cy={radius} r={radius} fill='#F5F5F5'/>
        <circle cx={radius} cy={radius} r={accessR} fill='#EEEEEE' stroke='white' stroke-width='2'/>
        <circle cx={radius} cy={radius} r={trialR} fill='#E0E0E0' stroke='white' stroke-width='2'/>
        <circle cx={radius} cy={radius} r={adoptR} fill='#BDBDBD' stroke='white' stroke-width='2'/>
        <rect x={serviceTrackOrigin} y='0' width={serviceTrackWidth} height={length} fill='rgba(255, 255, 255, 0.5)'
              class='service-track'/>
        <rect x='0' y={serviceTrackOrigin} width={length} height={serviceTrackWidth} fill='rgba(255, 255, 255, 0.5)'
              class='service-track'/>
        <text x={holdTextX} y={radius} fill='#37474F' fontSize={labelFontSize} textAnchor='middle'
              dominantBaseline='central'>HOLD
        </text>
        <text x={assessTextX} y={radius} fill='#37474F' fontSize={labelFontSize} textAnchor='middle'
              dominantBaseline='central'>ASSESS
        </text>
        <text x={trialTextX} y={radius} fill='#37474F' fontSize={labelFontSize} textAnchor='middle'
              dominantBaseline='central'>TRIAL
        </text>
        <text x={adoptTextX} y={radius} fill='#37474F' fontSize={labelFontSize} textAnchor='middle'
              dominantBaseline='central'>ADOPT
        </text>
        {
          this.state.points
            .map(item => {
              let point = this.cartesian2Screen(item)
              let color = this.getColorByPoint(item)
              if (item.type == 'old') {
                return <Triangle point={point} radius={pointRadius} key={`${item.id}`} fillColor={color}/>
              } else {
                return <Circle point={point} radius={pointRadius} key={`${item.id}`} fillColor={color}/>
              }
            })
        }
        {
          this.state.points
            .map((item) => ({
              ...item,
              index: this.state.points.indexOf(item) + 1
            }))
            .map((point) => this.cartesian2Screen(point))
            .map(item =>
              <text x={item.x}
                    y={item.y}
                    fill='#FFFFFF'
                    fontSize={pointRadius}
                    textAnchor='middle'
                    dominantBaseline='central'
              >
                {item.index}
              </text>)
        }
      </svg>
    )
  }
}

RadarComponent.displayName = 'SvgRadarComponent'

// Uncomment properties you need
// RadarComponent.propTypes = {};
// RadarComponent.defaultProps = {};

export default RadarComponent
