'use strict'

import React from 'react'

import './RadarList.scss'

class RadarList extends React.Component {

  constructor(props) {
    super()
    this.state = {items: props.items}
    this.title = props.title
  }

  render() {
    return (
      <div>
        {this.title}
        <ul>
          {this.state.items.map((item) => <li>{item.index}. {item.name}</li>)}
        </ul>
      </div>
    )
  }
}

// Uncomment properties you need
// RadarList.propTypes = {};
// RadarList.defaultProps = {};

export default RadarList
