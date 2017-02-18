'use strict'

import React from 'react'

import './Button.scss'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.title = props.title
    this.onClick = props.onClick
  }

  render() {
    return (
      <button style={{color: 'black', border: 'none', borderRadius: '5px'}} type="button" onClick={this.onClick}>{this.title}</button>
    )
  }
}

// Uncomment properties you need
// Button.propTypes = {};
// Button.defaultProps = {};

export default Button
