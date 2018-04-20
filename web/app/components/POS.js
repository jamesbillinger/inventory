import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Inventory extends Component {
  render() {
    return (
      <div style={{flex:'1 1 auto', display:'grid', gridTemplateColumns:'1fr auto', gridTemplateRows:'auto 1fr auto'}}>
        <div style={{gridColumn:'1 / 2', gridRow:'1'}}>
          top
        </div>
        <div style={{gridColumn:'1', gridRow:'2'}}>
          left middle
        </div>
        <div style={{gridColumn:'2', gridRow:'2'}}>
          right middle
        </div>
        <div style={{gridColumn:'1 /2', gridRow:'3'}}>
          bottom
        </div>
      </div>
    )
  }
}