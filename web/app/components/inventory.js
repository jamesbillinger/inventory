import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Inventory extends Component {
  render() {
    return (
      <div style={{margin:'20px', padding:'10px',borderRadius:'10px'}}>
        <div>Inventory!</div>
        <RaisedButton label="a button yo"  />
      </div>
    )
  }
}