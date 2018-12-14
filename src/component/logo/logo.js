import React, { Component } from 'react'
import './logo.css'
class Logo extends Component {
  render() {
    console.log("logo")
    return (
      <div className="logo-container">
        <img src={require('../img/images.png')} alt=''/>
      </div>
    )
  }
}

export default Logo