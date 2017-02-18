'use strict'

import React from 'react'

import './RadarList.scss'

class RadarList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert('Changed: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    const { title, points } = this.props
    return (
      <div>
        {title}
        <ul>
          {points.map((item) => <li>{item.index}. {item.name}</li>)}
        </ul>
      </div>
    )
  }
}

// Uncomment properties you need
// RadarList.propTypes = {}
// RadarList.defaultProps = {}

export default RadarList
