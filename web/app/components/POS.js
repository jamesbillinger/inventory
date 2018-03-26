import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Inventory extends Component {
  render() {
    return (
      <div style={{flex:'1 1 auto', backgroundColor:'white', borderRadius:'6px', padding:'10px'}}>
        <div>POS!</div>
        <RaisedButton label="POS button"  />
      </div>
    )
  }
}