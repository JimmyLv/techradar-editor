'use strict'

import React from 'react'
import Button from '../common/Button'
import './RadarList.scss'

class RadarList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(point) {
    let enterName = prompt('Enter a value')
    if (enterName === null) {
      return
    }
    let toChange = confirm('Are u sure?')
    if (toChange) {
      const mergedPoints = this.props.allPoints.map(
        (item) => {
          if (item.id === point.id) {
            item.name = enterName
          }
          return item
        })
      this.props.updatePoint(mergedPoints)
    }
  }

  render() {
    const { title, points } = this.props
    return (
      <div>
        {title}
        <ul>
          {points.map((point) => <li key={point.id}>
            <span>{point.index}. {point.name}    </span>
            <Button title='修改' onClick={() => this.handleClick(point)} />
          </li>)}
        </ul>
      </div>
    )
  }
}

export default RadarList
