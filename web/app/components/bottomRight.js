import React, { Component } from 'react';

export default class LeftMenu extends Component {
  render() {
    return (
      <div style={{gridRow:'3', gridColumn:'3 / 3'}}>
        <div>Bottom Right</div>
      </div>
    )
  }
}