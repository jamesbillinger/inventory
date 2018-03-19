import React, { Component } from 'react';

export default class LeftMenu extends Component {
  render() {
    return (
      <div style={{gridRow:'3', gridColumn:'1 / 3'}}>
        <div>Left Bottom</div>
      </div>
    )
  }
}