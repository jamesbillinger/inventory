import React, { Component } from 'react';

export default class LeftMenu extends Component {
  render() {
    return (
      <div style={{gridRow:'3', gridColumn:'2 / 3'}}>
        <div>Bottom Middle</div>
      </div>
    )
  }
}