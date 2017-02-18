'use strict'

import React from 'react'
import {Button, Image, Grid, Row, Col} from 'react-bootstrap'

import './HomePage.scss'

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.onCreateRadar = props.showRadar
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <Image src="http://www.impactprogram.org/wp-content/uploads/2014/09/RADAR_4color.png" rounded />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="col-md-4 center-block">
                <Button onClick={this.onCreateRadar}>Come on</Button>
                <Button>pa pa</Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

// Uncomment properties you need
// HomePage.propTypes = {};
// HomePage.defaultProps = {};

export default HomePage
